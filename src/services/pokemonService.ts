import type { Pokemon } from "../models/pokemon";
import type { CreatePokemonRequestDto } from "../dto/pokemon/createPokemonRequest.dto";

export interface PokemonService {
    createPokemon(data: CreatePokemonRequestDto): Promise<Pokemon>;
}
