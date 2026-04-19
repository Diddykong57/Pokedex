import type { Pokemon, PokemonListItem } from "../models/pokemon";
import type { CreatePokemonRequestDto } from "../dto/pokemon/createPokemonRequest.dto";

export interface PokemonService {
    createPokemon(data: CreatePokemonRequestDto): Promise<Pokemon>;
    getPokemonList(): Promise<PokemonListItem[]>;
}
