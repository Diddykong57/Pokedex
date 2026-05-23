export interface CreatePokemonRequestDto {
    name: string;
    types: string[];
    description: string;
    region: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
}
