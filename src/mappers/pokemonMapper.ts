import { Pokemon } from "../models/pokemon";
import type {PokemonMetadataItem, PokemonStatsItem} from "../repositories/types/pokemonItem";
import type {PokemonResponseDto} from "../dto/pokemon/pokemonResponse.dto";

export const toPokemonItems = (pokemon: Pokemon): [PokemonMetadataItem, PokemonStatsItem] => {
    const pk = `POKEMON#${pokemon.id}`;

    return [
        {
            PK: pk,
            SK: "METADATA",
            GSI1PK: "POKEMON",
            GSI1SK: pokemon.name,
            entityType: "POKEMON_METADATA",
            name: pokemon.name,
            types: pokemon.types,
            description: pokemon.description,
            region: pokemon.region,
            createdAt: pokemon.createdAt,
        },
        {
            PK: pk,
            SK: "STATS",
            entityType: "POKEMON_STATS",
            maxLevel: pokemon.maxLevel,
            maxHp: pokemon.maxHp,
            maxAttack: pokemon.maxAttack,
            maxDefense: pokemon.maxDefense,
            createdAt: pokemon.createdAt,
        },
    ];
};

export const toPokemonResponseDto = (pokemon: Pokemon): PokemonResponseDto => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    description: pokemon.description,
    region: pokemon.region,
    maxLevel: pokemon.maxLevel,
    maxHp: pokemon.maxHp,
    maxAttack: pokemon.maxAttack,
    maxDefense: pokemon.maxDefense,
    createdAt: pokemon.createdAt,
});