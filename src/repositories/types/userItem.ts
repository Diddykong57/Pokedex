import { BaseItem } from "./baseItem";

export interface UserProfileItem extends BaseItem{
    SK: "PROFILE";
    entityType: "USER_PROFILE";
    userId: string;
    email: string;
    nickname: string;
    createdAt: string;
}

export interface UserPokemonItem extends BaseItem {
    SK: `POKEMON#${string}`;
    entityType: "USER_POKEMON";
    userId: string;
    pokemonId: string;
    name: string;
    type: string;
    hp: number;
    maxHp: number;
    attack: number;
    defense: number;
    level: number;
    createdAt: string;
}

export type UserItem = UserProfileItem | UserPokemonItem;