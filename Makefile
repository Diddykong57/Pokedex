# =============================================================================
# Makefile — Pokedex API (exemple simplifié)
# Inspiré du template d'entreprise novatraqr.
#
# Usage typique :
#   make build package deploy env=dev
#   make clean-stack env=dev
# =============================================================================

env         ?= dev
region      ?= eu-west-1
logLevel    ?= debug

pkg-name        = $(shell node -p "require('./package.json').name")
pkg-version     = $(shell node -p "require('./package.json').version")
stackNameSuffix ?= $(env)
stackName       ?= $(pkg-name)-$(stackNameSuffix)

# Liste des stacks dont on lit les outputs (régénère les .outputs à la demande)
stackNames      = $(initStackName) $(stackName)

# -----------------------------------------------------------------------------
# Outputs lus depuis $(stackName).outputs après déploiement
# Format du fichier : "OutputKey<TAB>OutputValue" (généré par plumbing.mk)
# -----------------------------------------------------------------------------
tableName       = $(shell grep -w 'TableName' $(stackName).outputs | cut -f2)
apiUrl          = $(shell grep -w 'ApiUrl'    $(stackName).outputs | cut -f2)

# -----------------------------------------------------------------------------
# Outputs d'autres services (ex: pour le service fight, on importerait pokedex)
# Décommenter et adapter dans le repo fight :
#
# pokedexStackName     ?= pokedex-$(env)
# pokedexEventBusName  ?= $(shell grep -w 'EventBusName' $(pokedexStackName).outputs | cut -f2)
# pokedexUserPoolArn   ?= $(shell grep -w 'UserPoolArn'  $(pokedexStackName).outputs | cut -f2)
# pokedexTableName     ?= $(shell grep -w 'TableName'    $(pokedexStackName).outputs | cut -f2)
#
# Et déclarer la dépendance sur la target deploy :
# deploy: $(pokedexStackName).outputs
# -----------------------------------------------------------------------------

createEventBus ?= false
eventBusName   ?= default

include mk/plumbing.mk

# -----------------------------------------------------------------------------
# Targets principales
# -----------------------------------------------------------------------------
.PHONY: all build package deploy clean clean-stack

all: clean build package deploy

build: node_modules
	@npm run test
	@npm run build
	@npm run build:layer

package: clean-package template-output.yml

deploy: template-output.yml $(initStackName).outputs
	sam deploy \
		--region $(region) \
		--template-file template-output.yml \
		--no-fail-on-empty-changeset \
		--stack-name $(stackName) \
		--capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
		--role-arn $(cloudformationRole) \
		--tags \
			novatraqr:cloudformation:stack-name=$(stackName) \
			novatraqr:git:commit=$(gitCommit) \
			novatraqr:git:version=$(gitVersion) \
			novatraqr:git:source=$(gitRepoName) \
		--parameter-overrides \
			ServiceName=$(pkg-name) \
			Environment=$(env) \
			StackSuffix=$(stackNameSuffix) \
			LoggerLevel=$(logLevel) \
			CreateEventBus=$(createEventBus) \
			EventBusName=$(eventBusName)

clean-stack:
	aws cloudformation delete-stack --region $(region) --stack-name $(stackName)
	@aws cloudformation wait stack-delete-complete --region $(region) --stack-name $(stackName)

clean:
	-@rm -f *.outputs
	-@rm -f template-output.yml
	-@rm -rf node_modules dist
