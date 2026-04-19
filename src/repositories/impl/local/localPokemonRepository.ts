import type { Pokemon, PokemonListItem } from "../../../models/pokemon";
import {toPokemonDetails, toPokemonFromMetadataItem, toPokemonItems} from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import type {PokemonItem, PokemonMetadataItem, PokemonStatsItem} from "../../types/pokemonItem";
import { POKEMON_ITEM } from "../../../global/constants/pokemon";
import {notFoundError} from "../../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../../global/constants/errorMessages";

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

    async getPokemonDetails(id: string): Promise<Pokemon> {
        const pk = `${POKEMON_ITEM.PK_PREFIX}#${id}`;

        const metadata = fakeDb.find(
            (item): item is PokemonMetadataItem =>
                item.PK === pk &&
                item.SK === POKEMON_ITEM.METADATA.SK
        );

        const stats = fakeDb.find(
            (item): item is PokemonStatsItem =>
                item.PK === pk &&
                item.SK === POKEMON_ITEM.STATS.SK
        );

        if (!metadata || !stats){
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND)
        }

        return toPokemonDetails(metadata, stats);
    }
}

export function getFakeDb() {
    return fakeDb;
}
