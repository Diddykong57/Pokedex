import type { Pokemon, PokemonListItem } from "../models/pokemon";

export interface PokemonRepository {
    create(userId: string, pokemon: Pokemon): Promise<void>;
    getPokemonList(userId: string): Promise<PokemonListItem[]>;
    getPokemonDetails(userId: string, pokemonId: string): Promise<Pokemon>;
    getPokemonDetailsByName(userId: string, name: string): Promise<PokemonListItem | null>;
    updatePokemon(userId: string, pokemon: Pokemon): Promise<void>;
    deletePokemon(userId: string, pokemonId: string): Promise<void>;
}
