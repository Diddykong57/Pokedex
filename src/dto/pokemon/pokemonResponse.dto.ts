export interface PokemonResponseDto {
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

export interface PokemonListResponseDto {
    id: string;
    name: string;
    types: string[];
    description: string;
    region: string;
}
