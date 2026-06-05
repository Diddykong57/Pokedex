export interface Pokemon {
    id: string;
    name: string;
    types: string[];
    description: string;
    region: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
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
