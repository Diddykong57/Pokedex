import type { Pokemon, PokemonListItem } from "../../../models/pokemon";
import { toPokemonFromMetadataItem, toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import type { PokemonItem, PokemonMetadataItem } from "../../types/pokemonItem";
import { POKEMON_ITEM } from "../../../global/constants/pokemon";

const fakeDb: PokemonItem[] = [];

export class LocalPokemonRepository implements PokemonRepository {
    // async is not required here, but kept for interface consistency
    async create(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);

        fakeDb.push(metadataItem);
        fakeDb.push(statsItem);
    }

    async getPokemonList(): Promise<PokemonListItem[]> {
        const pokemonList = fakeDb.filter(
            item => item.SK === POKEMON_ITEM.METADATA.SK && item.GSI1PK === POKEMON_ITEM.METADATA.GSI1PK
        ) as PokemonMetadataItem[];
        return pokemonList.map(item => toPokemonFromMetadataItem(item));
    }
}

export function getFakeDb() {
    return fakeDb;
}
