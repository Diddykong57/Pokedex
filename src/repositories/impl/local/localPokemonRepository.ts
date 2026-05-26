import type { Pokemon, PokemonListItem } from "../../../models/pokemon";
import { toPokemonDetails, toPokemonFromMetadataItem, toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import type { PokemonItem, PokemonMetadataItem, PokemonStatsItem } from "../../types/pokemonItem";
import { POKEMON_ITEM } from "../../../global/constants/pokemon";
import { notFoundError } from "../../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../../global/constants/errorMessages";
import { USER_ITEM } from "../../../global/constants/user";

const fakePokemonDb: PokemonItem[] = [];

export class LocalPokemonRepository implements PokemonRepository {
    // async is not required here, but kept for interface consistency
    async create(userId: string, pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(userId, pokemon);

        fakePokemonDb.push(metadataItem);
        fakePokemonDb.push(statsItem);
    }

    async getPokemonList(userId: string): Promise<PokemonListItem[]> {
        const pk = `${USER_ITEM.PK_PREFIX}#${userId}`;
        const pokemonList = fakePokemonDb.filter(
            item =>
                item.PK === pk &&
                item.SK.startsWith(`${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}`)
        ) as PokemonMetadataItem[];
        return pokemonList.map(item => toPokemonFromMetadataItem(item));
    }

    async getPokemonDetails(userId:string, pokemonId:string): Promise<Pokemon> {
        const pk = `${USER_ITEM.PK_PREFIX}#${userId}`;
        const skMetadata = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}#${pokemonId}`;
        const skStats = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.STATS.SK}#${pokemonId}`;

        const metadata = await this.getMetadata(pk, skMetadata);
        const stats = await this.getStats(pk, skStats);

        return toPokemonDetails(metadata, stats);
    }

    async getPokemonDetailsByName(userId: string, name: string): Promise<PokemonListItem | null> {
        const pk = `${USER_ITEM.PK_PREFIX}#${userId}`;
        const metadata = fakePokemonDb.find(
            (item): item is PokemonMetadataItem =>
                item.PK === pk &&
                item.GSI1PK === POKEMON_ITEM.METADATA.GSI1PK &&
                item.name === name
        );

        if (!metadata) {
            return null;
        }

        return toPokemonFromMetadataItem(metadata);
    }

    async updatePokemon(userId: string, pokemon: Pokemon): Promise<void> {
        const metadataIndex = await this.getMetadataIndex(userId, pokemon.id);
        const statsIndex = await this.getStatsIndex(userId, pokemon.id);

        const [metadataItem, statsItem] = toPokemonItems(userId, pokemon);

        fakePokemonDb[metadataIndex] = metadataItem;
        fakePokemonDb[statsIndex] = statsItem;
    }

    async deletePokemon(userId: string, pokemonId: string): Promise<void> {
        const metadataIndex = await this.getMetadataIndex(userId, pokemonId);
        const statsIndex = await this.getStatsIndex(userId, pokemonId);

        fakePokemonDb.splice(metadataIndex, 1);
        fakePokemonDb.splice(statsIndex, 1);
    }

    private async getMetadata(pk: string, sk: string): Promise<PokemonMetadataItem> {
        const metadata = fakePokemonDb.find(
            (item): item is PokemonMetadataItem => item.PK === pk && item.SK === sk
        );

        if (!metadata) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return metadata;
    }

    private async getStats(pk: string, skStats: string): Promise<PokemonStatsItem> {
        const stats = fakePokemonDb.find(
            (item): item is PokemonStatsItem => item.PK === pk && item.SK === skStats
        );

        if (!stats) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return stats;
    }

    private async getMetadataIndex(userId: string, pokemonId: string): Promise<number> {
        const index = fakePokemonDb.findIndex(
            (item): item is PokemonMetadataItem =>
                item.PK === `${USER_ITEM.PK_PREFIX}#${userId}` &&
                item.SK === `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}#${pokemonId}`
        );

        if (index === -1) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return index;
    }

    private async getStatsIndex(userId: string, pokemonId: string): Promise<number> {
        const index = fakePokemonDb.findIndex(
            (item): item is PokemonMetadataItem =>
                item.PK === `${USER_ITEM.PK_PREFIX}#${userId}` &&
                item.SK === `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.STATS.SK}#${pokemonId}`
        );

        if (!index) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return index;
    }
}

export function getFakeDb() {
    return fakePokemonDb;
}
