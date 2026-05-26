import { Pokemon, PokemonListItem } from "../models/pokemon";
import type { PokemonMetadataItem, PokemonStatsItem } from "../repositories/types/pokemonItem";
import type { PokemonListResponseDto, PokemonResponseDto } from "../dto/pokemon/pokemonResponse.dto";
import { POKEMON_ITEM } from "../global/constants/pokemon";
import { USER_ITEM } from "../global/constants/user";

export const toPokemonItems = (userId: string, pokemon: Pokemon): [PokemonMetadataItem, PokemonStatsItem] => {
    const pk = `${USER_ITEM.PK_PREFIX}#${userId}`;

    return [
        {
            PK: pk,
            SK: `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}#${pokemon.id}`,
            GSI1PK: POKEMON_ITEM.METADATA.GSI1PK,
            GSI1SK: pokemon.name,
            entityType: POKEMON_ITEM.METADATA.ENTITY_TYPE,
            userId: userId,
            pokemonId: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            description: pokemon.description,
            region: pokemon.region,
            createdAt: pokemon.createdAt,
        },
        {
            PK: pk,
            SK: `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.STATS.SK}#${pokemon.id}`,
            entityType: POKEMON_ITEM.STATS.ENTITY_TYPE,
            userId: userId,
            pokemonId: pokemon.id,
            level: pokemon.level,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            createdAt: pokemon.createdAt,
        },
    ];
};

export const toPokemonFromMetadataItem = (item: PokemonMetadataItem): PokemonListItem => ({
    id: item.pokemonId,
    name: item.name,
    types: item.types,
    description: item.description,
    region: item.region,
    createdAt: item.createdAt,
});

export const toPokemonDetails = (metadataItem: PokemonMetadataItem, statsItem: PokemonStatsItem): Pokemon => ({
    id: metadataItem.pokemonId,
    name: metadataItem.name,
    types: metadataItem.types,
    description: metadataItem.description,
    region: metadataItem.region,
    level: statsItem.level,
    hp: statsItem.hp,
    attack: statsItem.attack,
    defense: statsItem.defense,
    createdAt: metadataItem.createdAt,
});

export const toPokemonResponseDto = (pokemon: Pokemon): PokemonResponseDto => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    description: pokemon.description,
    region: pokemon.region,
    level: pokemon.level,
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    createdAt: pokemon.createdAt,
});

export const toPokemonListResponseDto = (pokemon: PokemonListItem): PokemonListResponseDto => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    description: pokemon.description,
    region: pokemon.region,
});
