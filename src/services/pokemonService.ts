import type { Pokemon, PokemonListItem } from "../models/pokemon";
import type { CreatePokemonRequestDto } from "../dto/pokemon/createPokemonRequest.dto";
import type {UpdatePokemonRequestDto} from "../dto/pokemon/updatePokemonRequest.dto";

export interface PokemonService {
    createPokemon(data: CreatePokemonRequestDto): Promise<Pokemon>;
    getPokemonList(): Promise<PokemonListItem[]>;
    getPokemonDetails(id: string): Promise<Pokemon>;
    updatePokemon(id: string, data: UpdatePokemonRequestDto): Promise<Pokemon>;
}
