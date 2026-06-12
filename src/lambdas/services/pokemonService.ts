import type { CreatePokemonRequestDto } from "../dto/pokemon/createPokemonRequest.dto";
import type { UpdatePokemonRequestDto } from "../dto/pokemon/updatePokemonRequest.dto";
import type { PokemonResponseDto } from "../dto/pokemon/pokemonResponse.dto";
import { PokemonListItem } from "../models/pokemon";

export interface PokemonService {
    createPokemon(userId: string, data: CreatePokemonRequestDto): Promise<PokemonResponseDto>;
    getPokemonList(userId: string): Promise<PokemonListItem[]>;
    getPokemonDetails(userId: string, pokemonId: string): Promise<PokemonResponseDto>;
    updatePokemon(userId: string, pokemonId: string, data: UpdatePokemonRequestDto): Promise<PokemonResponseDto>;
    deletePokemon(userId: string, id: string): Promise<void>;
    getNumberOfPokemonAdded(userId: string): Promise<number>
}
