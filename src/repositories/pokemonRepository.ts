import type {Pokemon} from "../models/pokemon";

export interface PokemonRepository {
    create(pokemon: Pokemon): Promise<void>;
}