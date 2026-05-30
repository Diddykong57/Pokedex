# Pokedex API

API REST serverless permettant de gérer des utilisateurs et leur collection personnelle de Pokémon.

Projet backend réalisé dans le cadre d’un exercice technique pour Novatraqr.

---

# Fonctionnalités

## Utilisateurs

- Créer un utilisateur via une route admin
- Récupérer les informations de l’utilisateur connecté
- Authentification via Amazon Cognito
- Gestion du rôle admin via le groupe Cognito admin

## Pokémon

- Créer un Pokémon pour l’utilisateur connecté
- Modifier un Pokémon de l’utilisateur connecté
- Supprimer un Pokémon de l’utilisateur connecté
- Récupérer le détail d’un Pokémon par id
- Lister les Pokémon de l’utilisateur connecté
- Les Pokémon sont rattachés au sub Cognito de l’utilisateur authentifié

---

# Stack technique

## Backend

- Node.js
- TypeScript
- Jest
- Joi
- ESLint
- Prettier

## AWS

- API Gateway
- Lambda
- DynamoDB
- Cognito User Pool
- Cognito Hosted UI
- IAM
- CloudWatch
- AWS SAM

## Documentation

- Swagger UI
- OpenAPI 3
- Documentation découpée en plusieurs fichiers YAML

---

# Liens

GitHub : https://github.com/Diddykong57/Pokedex.git

API : https://9f1ws5ee1g.execute-api.eu-west-3.amazonaws.com/prod

Documentation : https://diddykong57.github.io/Pokedex/

---

# Endpoints

## HealthCheck

- GET /healthCheck

    Permet de vérifier que l’API est disponible.

---

## User

- GET /users/me

    Récupère les informations de l’utilisateur connecté.

  (Auth requise : JWT Cognito.)


- POST /admin/users

    Crée un utilisateur.

  (Auth requise : JWT Cognito + groupe admin.)

---

## Pokémon

- GET /users/me/pokemons

    Liste les Pokémon de l’utilisateur connecté.


- POST /users/me/pokemons

    Crée un Pokémon pour l’utilisateur connecté.


- GET /users/me/pokemons/{id}

    Récupère le détail d’un Pokémon de l’utilisateur connecté.


- PUT /users/me/pokemons/{id}

    Met à jour un Pokémon de l’utilisateur connecté.


- DELETE /users/me/pokemons/{id}

    Supprime un Pokémon de l’utilisateur connecté.

---

# Codes HTTP

| Code | Description |
| ---- | ----------- |
| 200  | Succès |
| 201  | Création réussie |
| 204  | Suppression réussie |
| 400  | Requête invalide |
| 401  | Non authentifié |
| 403  | Accès interdit |
| 404  | Ressource introuvable |
| 409  | Ressource déjà existante |
| 500  | Erreur serveur |

---

# Architecture AWS

## API Gateway

Expose les routes REST de l’application.

Routes principales :

- /healthCheck
- /users/me
- /admin/users
- /users/me/pokemons
- /users/me/pokemons/{id}

## Lambdas

- HealthCheckFunction : vérification de disponibilité
- PokedexFunction : gestion des routes Pokémon
- AdminUserFunction : gestion des routes utilisateur

## DynamoDB

Stockage des utilisateurs et des Pokémon.

Les Pokémon sont stockés par utilisateur avec une clé de partition basée sur l’id Cognito :

USER#{userId}

## Cognito

- Authentification des utilisateurs
- Hosted UI pour Swagger
- Groupe admin pour les routes d’administration

---

# Documentation Swagger

La documentation est disponible dans le dossier docs.

Lancer la commande : **npm run swagger**

---

# Structure du projet

- src/
- dto/               : objets de requête / réponse
- global/            : constantes et types globaux
- handlers/          : points d’entrée Lambda
- mappers/           : transformations de données
- models/            : modèles métier
- repositories/      : accès aux données
- services/          : logique métier
- tests/             : fixtures et tests
- utils/             : helpers techniques
- validators/        : validation des entrées

---

# Lancement local

Installer les dépendances : npm install

Lancer le script local : npm run dev

Lancer les tests : npm test

Compiler le projet : npm run build

Lancer Prettier + ESLint fix : npm run prettylint

---

# Déploiement AWS

Le déploiement est piloté par le Makefile.

Déployer en environnement dev : make all env=dev

Déployer uniquement la stack déjà packagée : make deploy env=dev

Supprimer la stack : make clean-stack env=dev

# Notes

- Les routes Pokémon ne sont plus publiques : elles dépendent de l’utilisateur connecté.
- Un utilisateur créé directement via Cognito Hosted UI peut exister dans Cognito sans encore exister dans DynamoDB.
- La route /admin/users permet de créer un utilisateur applicatif, mais nécessite un utilisateur Cognito appartenant au groupe admin.
- GET /users/me/pokemons retourne [] si l’utilisateur n’a aucun Pokémon.

---

### Nicolas Schutzing