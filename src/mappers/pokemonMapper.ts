import { Pokemon, PokemonListItem } from "../models/pokemon";
import type { PokemonMetadataItem, PokemonStatsItem } from "../repositories/types/pokemonItem";
import type { PokemonListResponseDto, PokemonResponseDto } from "../dto/pokemon/pokemonResponse.dto";
import { POKEMON_ITEM } from "../global/constants/pokemon";

export const toPokemonItems = (pokemon: Pokemon): [PokemonMetadataItem, PokemonStatsItem] => {
    const pk = `${POKEMON_ITEM.PK_PREFIX}#${pokemon.id}`;

    return [
        {
            PK: pk,
            SK: POKEMON_ITEM.METADATA.SK,
            GSI1PK: POKEMON_ITEM.METADATA.GSI1PK,
            GSI1SK: pokemon.name,
            entityType: POKEMON_ITEM.METADATA.ENTITY_TYPE,
            name: pokemon.name,
            types: pokemon.types,
            description: pokemon.description,
            region: pokemon.region,
            createdAt: pokemon.createdAt,
        },
        {
            PK: pk,
            SK: POKEMON_ITEM.STATS.SK,
            entityType: POKEMON_ITEM.STATS.ENTITY_TYPE,
            maxLevel: pokemon.maxLevel,
            maxHp: pokemon.maxHp,
            maxAttack: pokemon.maxAttack,
            maxDefense: pokemon.maxDefense,
            createdAt: pokemon.createdAt,
        },
    ];
};

export const toPokemonFromMetadataItem = (item: PokemonMetadataItem): PokemonListItem => ({
    id: item.PK.replace("POKEMON#", ""),
    name: item.name,
    types: item.types,
    description: item.description,
    region: item.region,
    createdAt: item.createdAt,
});

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

export const toPokemonListResponseDto = (pokemon: PokemonListItem): PokemonListResponseDto => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    description: pokemon.description,
    region: pokemon.region,
});
