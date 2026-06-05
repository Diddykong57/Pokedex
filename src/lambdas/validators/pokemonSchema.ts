import * as Joi from "joi";

const pokemonFields = {
    name: Joi.string().min(2).max(50),
    types: Joi.array().items(Joi.string().min(3).max(20)).min(1),
    description: Joi.string().min(10).max(500),
    region: Joi.string().min(2).max(50),
    level: Joi.number().integer().min(80).max(120),
    hp: Joi.number().integer().min(1),
    attack: Joi.number().integer().min(1),
    defense: Joi.number().integer().min(1),
};

export const createPokemonSchema = Joi.object({
    name: pokemonFields.name.required(),
    types: pokemonFields.types.required(),
    description: pokemonFields.description.required(),
    region: pokemonFields.region.required(),
    level: pokemonFields.level.required(),
    hp: pokemonFields.hp.required(),
    attack: pokemonFields.attack.required(),
    defense: pokemonFields.defense.required(),
}).required();

export const updatePokemonSchema = Joi.object({
    name: pokemonFields.name.optional(),
    types: pokemonFields.types.optional(),
    description: pokemonFields.description.optional(),
    region: pokemonFields.region.optional(),
    level: pokemonFields.level.optional(),
    hp: pokemonFields.hp.optional(),
    attack: pokemonFields.attack.optional(),
    defense: pokemonFields.defense.optional(),
}).required();
