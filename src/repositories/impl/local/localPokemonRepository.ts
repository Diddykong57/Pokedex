import type { Pokemon, PokemonListItem } from "../../../models/pokemon";
import { toPokemonDetails, toPokemonFromMetadataItem, toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import type { PokemonItem, PokemonMetadataItem, PokemonStatsItem } from "../../types/pokemonItem";
import { POKEMON_ITEM } from "../../../global/constants/pokemon";
import { notFoundError } from "../../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../../global/constants/errorMessages";

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

        const metadata = await this.getMetadata(pk);
        const stats = await this.getStats(pk);

        if (!metadata || !stats) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return toPokemonDetails(metadata, stats);
    }

    async updatePokemon(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);
        const pk = `${POKEMON_ITEM.PK_PREFIX}#${pokemon.id}`;

        const metadataIndex = await this.getMetadataIndex(pk);
        const statsIndex = await this.getStatsIndex(pk);

        fakeDb[metadataIndex] = metadataItem;
        fakeDb[statsIndex] = statsItem;
    }

    async deletePokemon(id: string): Promise<void> {
        const pk = `${POKEMON_ITEM.PK_PREFIX}#${id}`;

        const metadataIndex = await this.getMetadataIndex(pk);
        const statsIndex = await this.getStatsIndex(pk);

        fakeDb.splice(metadataIndex, 1);
        fakeDb.splice(statsIndex, 1);
    }

    private async getMetadata(pk: string): Promise<PokemonMetadataItem> {
        const metadata = fakeDb.find(
            (item): item is PokemonMetadataItem => item.PK === pk && item.SK === POKEMON_ITEM.METADATA.SK
        );

        if (!metadata) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return metadata;
    }

    private async getStats(pk: string): Promise<PokemonStatsItem> {
        const stats = fakeDb.find(
            (item): item is PokemonStatsItem => item.PK === pk && item.SK === POKEMON_ITEM.STATS.SK
        );

        if (!stats) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return stats;
    }

    private async getMetadataIndex(pk: string): Promise<number> {
        const index = fakeDb.findIndex(
            (item): item is PokemonMetadataItem => item.PK === pk && item.SK === POKEMON_ITEM.METADATA.SK
        );

        if (index === -1) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return index;
    }

    private async getStatsIndex(pk: string): Promise<number> {
        const index = fakeDb.findIndex(
            (item): item is PokemonStatsItem => item.PK === pk && item.SK === POKEMON_ITEM.STATS.SK
        );

        if (!index) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return index;
    }
}

export function getFakeDb() {
    return fakeDb;
}
