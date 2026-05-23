export interface PokemonResponseDto {
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

export interface PokemonListResponseDto {
    id: string;
    name: string;
    types: string[];
    description: string;
    region: string;
}
