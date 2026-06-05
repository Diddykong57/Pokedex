import type { BaseItem } from "./baseItem";

export interface PokemonMetadataItem extends BaseItem {
    GSI1PK: "POKEMON";
    GSI1SK: string;
    entityType: "USER_POKEMON_METADATA";
    userId: string;
    pokemonId: string;
    name: string;
    types: string[];
    description: string;
    region: string;
    createdAt: string;
}

export interface PokemonStatsItem extends BaseItem {
    entityType: "USER_POKEMON_STATS";
    userId: string;
    pokemonId: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    createdAt: string;
}

export type PokemonItem = PokemonMetadataItem | PokemonStatsItem;
