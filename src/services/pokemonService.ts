import type { CreatePokemonRequestDto } from "../dto/pokemon/createPokemonRequest.dto";
import type { UpdatePokemonRequestDto } from "../dto/pokemon/updatePokemonRequest.dto";
import type { PokemonResponseDto } from "../dto/pokemon/pokemonResponse.dto";
import { PokemonListItem } from "../models/pokemon";

export interface PokemonService {
    createPokemon(data: CreatePokemonRequestDto): Promise<PokemonResponseDto>;
    getPokemonList(): Promise<PokemonListItem[]>;
    getPokemonDetails(id: string): Promise<PokemonResponseDto>;
    updatePokemon(id: string, data: UpdatePokemonRequestDto): Promise<PokemonResponseDto>;
    deletePokemon(id: string): Promise<void>;
}
