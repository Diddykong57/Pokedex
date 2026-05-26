import type { Pokemon, PokemonListItem } from "../../../models/pokemon";
import { toPokemonDetails, toPokemonFromMetadataItem, toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, DeleteCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { POKEMON_ITEM } from "../../../global/constants/pokemon";
import type { PokemonMetadataItem, PokemonStatsItem } from "../../types/pokemonItem";
import { notFoundError } from "../../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../../global/constants/errorMessages";
import { USER_ITEM } from "../../../global/constants/user";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoPokemonRepository implements PokemonRepository {
    private readonly tableName = process.env.TABLE_NAME!;

    async create(userId: string, pokemon: Pokemon): Promise<void> {
        await this.savePokemon(userId, pokemon);
    }

    async getPokemonList(userId: string): Promise<PokemonListItem[]> {
        const pk = this.buildPk(userId);
        const skPrefix = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}#`;
        const response = await docClient.send(
            new QueryCommand({
                TableName: this.tableName,
                KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
                ExpressionAttributeValues: {
                    ":pk": pk,
                    ":skPrefix": skPrefix,
                },
            })
        );

        const pokemonList = (response.Items ?? []) as PokemonMetadataItem[];

        return pokemonList.map(item => toPokemonFromMetadataItem(item));
    }

    async getPokemonDetails(userId:string, pokemonId:string): Promise<Pokemon> {
        const pk = this.buildPk(userId);
        const skMetadata = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}#${pokemonId}`;
        const skStats = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.STATS.SK}#${pokemonId}`;

        const metadata = await this.getMetadata(pk, skMetadata);
        const stats = await this.getStats(pk, skStats);

        return toPokemonDetails(metadata, stats);
    }

    async getPokemonDetailsByName(userId: string, name: string): Promise<PokemonListItem | null> {
        const pk = this.buildPk(userId);
        const skPrefix = `${POKEMON_ITEM.NAME}`;
        const response = await docClient.send(
            new QueryCommand({
                TableName: this.tableName,
                KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
                FilterExpression: "GSI1PK = :gsi1pk AND #name = :name",
                ExpressionAttributeNames: {
                    "#name": "name",
                },
                ExpressionAttributeValues: {
                    ":pk": pk,
                    ":skPrefix": skPrefix,
                    ":gsi1pk": POKEMON_ITEM.METADATA.GSI1PK,
                    ":name": name,
                },
            })
        );

        const metadataItem = response.Items?.[0] as PokemonMetadataItem | undefined;

        if (!metadataItem) {
            return null;
        }

        return toPokemonFromMetadataItem(metadataItem);
    }

    async updatePokemon(userId: string, pokemon: Pokemon): Promise<void> {
        await this.savePokemon(userId, pokemon);
    }

    async deletePokemon(userId: string, pokemonId: string): Promise<void> {
        const pk = this.buildPk(userId);
        const skMetadata = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.METADATA.SK}#${pokemonId}`;
        const skStats = `${POKEMON_ITEM.NAME}#${POKEMON_ITEM.STATS.SK}#${pokemonId}`;

        await docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: skMetadata,
                },
            })
        );

        await docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: skStats,
                },
            })
        );
    }

    private async getMetadata(pk: string, sk: string): Promise<PokemonMetadataItem> {
        const response = await docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: sk,
                },
            })
        );

        if (!response.Item) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return response.Item as PokemonMetadataItem;
    }

    private async getStats(pk: string, sk: string): Promise<PokemonStatsItem> {
        const response = await docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: sk,
                },
            })
        );

        if (!response.Item) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return response.Item as PokemonStatsItem;
    }

    private buildPk(userId: string): string {
        return `${USER_ITEM.PK_PREFIX}#${userId}`;
    }

    private async savePokemon(userId: string, pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(userId, pokemon);

        await docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: metadataItem,
            })
        );

        await docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: statsItem,
            })
        );
    }
}
