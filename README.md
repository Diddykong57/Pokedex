
# Pokedex API

API REST de gestion d’un catalogue de Pokémon.

Projet backend réalisé dans le cadre d’un exercice technique pour **Novatraqr**.

---

# Fonctionnalités

- Créer un Pokémon
- Modifier un Pokémon
- Supprimer un Pokémon
- Récupérer un Pokémon par id
- Lister tous les Pokémon

**Accès :**

- `GET` publics
- `POST / PUT / DELETE` protégés par authentification

---

# Stack technique

## Backend

- Node.js
- TypeScript

## AWS

- API Gateway
- Lambda
- DynamoDB
- Cognito
- AWS SAM
- CloudWatch
- IAM

## Outils

- Swagger / OpenAPI
- Jest

---

# Architecture AWS

## API Gateway

- **pokedex-api**

## Lambdas

- **pokedex-healthcheck** - disponibilité de l’API
- **pokedex-api** - Microservice pokemon

## DynamoDB

- **pokedex-dynamo**

---

# Liens

**GitHub** : https://github.com/Diddykong57/Pokedex.git  
**API** : https://36ymd9qykj.execute-api.eu-north-1.amazonaws.com/prod  
**Documentation** : https://diddykong57.github.io/Pokedex/

---

# Endpoints

## Publics

```http
GET /healthCheck
GET /pokemon
GET /pokemon/{id}
````

## Protégés

```http
POST /pokemon
PUT /pokemon/{id}
DELETE /pokemon/{id}
```

## Exemple d’architecture des routes

* `/healthCheck` → Lambda **pokedex-healthcheck**
* `/pokemon/*` → Lambda **pokedex-api**

---

# Authentification

Les routes protégées utilisent Amazon Cognito.
Connexion possible via Swagger (**Authorize**).

---

# Codes HTTP

| Code | Description           |
| ---- | --------------------- |
| 200  | Succès                |
| 201  | Création réussie      |
| 204  | Suppression réussie   |
| 400  | Requête invalide      |
| 401  | Non autorisé          |
| 404  | Introuvable           |
| 409  | Pokémon déjà existant |
| 500  | Erreur serveur        |

---

# Structure

```text
docs/                   : documentation Swagger
src/
 ├── dto/               : objets de réponse / requête
 ├── global/            : constantes / types globaux
 ├── handlers/          : points d’entrée Lambda
 ├── mappers/           : transformations de données
 ├── models/            : modèles métier
 ├── repositories/      : accès données
 ├── services/          : logique métier
 ├── tests/             : tests unitaires
 ├── utils/             : helpers techniques
 ├── validators/        : validation des entrées
```

---

# Lancement local

```bash
npm install
npm run dev
npm test 
```

---

# Déploiement AWS

```bash
npm run deploy
```

---

# Bonus

* Authentification Cognito
* Déploiement AWS
* Infrastructure as Code (SAM)
* Documentation Swagger
* Tests unitaires

---

### Nicolas Schutzing
