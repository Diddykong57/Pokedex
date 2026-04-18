import type {Pokemon} from "../../../models/pokemon";
import {toPokemonItems} from "../../../mappers/pokemonMapper";
import type {PokemonRepository} from "../../pokemonRepository";
import type {PokemonItem} from "../../types/pokemonItem";

const fakeDb: PokemonItem[] = [];

export class LocalPokemonRepository implements PokemonRepository {
    // async is not required here, but kept for interface consistency
    async create(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);

        fakeDb.push(metadataItem);
        fakeDb.push(statsItem);
    }
}

export const getFakeDb = () => fakeDb;