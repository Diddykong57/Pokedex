export interface Pokemon {
    id: string;
    name: string;
    types: string[];
    description: string;
    region: string;
    maxLevel: number;
    maxHp: number;
    maxAttack: number;
    maxDefense: number;
    createdAt: string;
}

export interface PokemonListItem {
    id: string;
    name: string;
    types: string[];
    description: string;
    region: string;
    createdAt: string;
}
