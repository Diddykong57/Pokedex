import type {BaseItem} from "./baseItem";

export interface PokemonMetadataItem extends BaseItem{
    SK: "METADATA";
    GSI1PK: "POKEMON";
    GSI1SK: string;
    entityType: "POKEMON_METADATA";
    name: string;
    types: string[];
    description: string;
    region: string;
    createdAt: string;
}

export interface PokemonStatsItem extends BaseItem{
    SK: "STATS";
    entityType: "POKEMON_STATS";
    maxLevel: number;
    maxHp: number;
    maxAttack: number;
    maxDefense: number;
    createdAt: string;
}

export type PokemonItem = PokemonMetadataItem | PokemonStatsItem;
