import type { Pokemon } from "../models/pokemon";

export interface PokemonRepository {
    create(pokemon: Pokemon): Promise<void>;
    getPokemonList(): Promise<Pokemon[]>;
    getPokemonDetails(id: string): Promise<Pokemon>;
    updatePokemon(pokemon: Pokemon): Promise<void>;
}
