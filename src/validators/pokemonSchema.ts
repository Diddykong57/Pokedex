import * as Joi from "joi";

const pokemonFields = {
    name: Joi.string().min(2).max(50),
    types: Joi.array().items(Joi.string().min(3).max(20)).min(1),
    description: Joi.string().min(10).max(500),
    region: Joi.string().min(2).max(50),
    maxLevel: Joi.number().integer().min(80).max(120),
    maxHp: Joi.number().integer().min(1),
    maxAttack: Joi.number().integer().min(1),
    maxDefense: Joi.number().integer().min(1),
};

export const createPokemonSchema = Joi.object({
    name: pokemonFields.name.required(),
    types: pokemonFields.types.required(),
    description: pokemonFields.description.required(),
    region: pokemonFields.region.required(),
    maxLevel: pokemonFields.maxLevel.required(),
    maxHp: pokemonFields.maxHp.required(),
    maxAttack: pokemonFields.maxAttack.required(),
    maxDefense: pokemonFields.maxDefense.required(),
}).required();

export const updatePokemonSchema = Joi.object({
    name: pokemonFields.name.optional(),
    types: pokemonFields.types.optional(),
    description: pokemonFields.description.optional(),
    region: pokemonFields.region.optional(),
    maxLevel: pokemonFields.maxLevel.optional(),
    maxHp: pokemonFields.maxHp.optional(),
    maxAttack: pokemonFields.maxAttack.optional(),
    maxDefense: pokemonFields.maxDefense.optional(),
}).required();
