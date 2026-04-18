export interface CreatePokemonRequestDto {
    name: string;
    types: string[];
    description: string;
    region: string;
    maxLevel: number;
    maxHp: number;
    maxAttack: number;
    maxDefense: number;
}