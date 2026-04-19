import type {Pokemon, PokemonListItem} from "../models/pokemon";

export interface PokemonRepository {
    create(pokemon: Pokemon): Promise<void>;
    getPokemonList(): Promise<PokemonListItem[]>;
    getPokemonDetails(id: string): Promise<Pokemon>;
    updatePokemon(pokemon: Pokemon): Promise<void>;
    deletePokemon(id :string): Promise<void>;
}
