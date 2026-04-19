import type {Pokemon, PokemonListItem} from "../../../models/pokemon";
import {toPokemonDetails, toPokemonFromMetadataItem, toPokemonItems} from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    UpdateCommand,
    PutCommand,
    DynamoDBDocumentClient,
    DeleteCommand, GetCommand, ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import {POKEMON_ITEM} from "../../../global/constants/pokemon";
import type {PokemonMetadataItem, PokemonStatsItem} from "../../types/pokemonItem";
import {notFoundError} from "../../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../../global/constants/errorMessages";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoPokemonRepository implements PokemonRepository {
    async create(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);

        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: metadataItem,
            })
        );

        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: statsItem,
            })
        );
    }

    async deletePokemon(id: string): Promise<void> {
        const pk = `${POKEMON_ITEM.PK_PREFIX}#${id}`;

        const metadataResponse = await docClient.send(
            new DeleteCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    PK: pk,
                    SK: POKEMON_ITEM.METADATA.SK,
                },
                ReturnValues: "ALL_OLD",
            })
        );

        const statsResponse = await docClient.send(
            new DeleteCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    PK: pk,
                    SK: POKEMON_ITEM.STATS.SK,
                },
                ReturnValues: "ALL_OLD",
            })
        );

        if (!metadataResponse.Attributes && !statsResponse.Attributes) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }
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

    async getPokemonList(): Promise<PokemonListItem[]> {
        const response = await docClient.send(
            new ScanCommand({
                TableName: process.env.TABLE_NAME,
                FilterExpression: "SK = :sk AND GSI1PK = :gsi1pk",
                ExpressionAttributeValues: {
                    ":sk": POKEMON_ITEM.METADATA.SK,
                    ":gsi1pk": POKEMON_ITEM.METADATA.GSI1PK,
                },
            })
        );

        const pokemonList = (response.Items ?? []) as PokemonMetadataItem[];

        return pokemonList.map(item => toPokemonFromMetadataItem(item));
    }

    async updatePokemon(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);

        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: metadataItem,
            })
        );

        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: statsItem,
            })
        );
    }

    private async getMetadata(pk: string): Promise<PokemonMetadataItem> {
        const response = await docClient.send(
            new GetCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    PK: pk,
                    SK: POKEMON_ITEM.METADATA.SK,
                },
            })
        );

        if (!response.Item) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return response.Item as PokemonMetadataItem;
    }

    private async getStats(pk: string): Promise<PokemonStatsItem> {
        const response = await docClient.send(
            new GetCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    PK: pk,
                    SK: POKEMON_ITEM.STATS.SK,
                },
            })
        );

        if (!response.Item) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return response.Item as PokemonStatsItem;
    }
}
