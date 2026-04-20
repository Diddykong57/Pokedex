import type { Pokemon, PokemonListItem } from "../../../models/pokemon";
import { toPokemonDetails, toPokemonFromMetadataItem, toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, DeleteCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { POKEMON_ITEM } from "../../../global/constants/pokemon";
import type { PokemonMetadataItem, PokemonStatsItem } from "../../types/pokemonItem";
import { notFoundError } from "../../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../../global/constants/errorMessages";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoPokemonRepository implements PokemonRepository {
    private readonly tableName = process.env.TABLE_NAME!;

    async create(pokemon: Pokemon): Promise<void> {
        await this.savePokemon(pokemon);
    }

    async deletePokemon(id: string): Promise<void> {
        const pk = this.buildPk(id);

        await docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: POKEMON_ITEM.METADATA.SK,
                },
            })
        );

        await docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: POKEMON_ITEM.STATS.SK,
                },
            })
        );
    }

    async getPokemonDetails(id: string): Promise<Pokemon> {
        const pk = this.buildPk(id);

        const metadata = await this.getMetadata(pk);
        const stats = await this.getStats(pk);

        return toPokemonDetails(metadata, stats);
    }

    async getPokemonDetailsByName(name: string): Promise<PokemonListItem | null> {
        const response = await docClient.send(
            new ScanCommand({
                TableName: this.tableName,
                FilterExpression: "SK = :sk AND GSI1PK = :gsi1pk AND #name = :name",
                ExpressionAttributeNames: {
                    "#name": "name",
                },
                ExpressionAttributeValues: {
                    ":sk": POKEMON_ITEM.METADATA.SK,
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

    async getPokemonList(): Promise<PokemonListItem[]> {
        const response = await docClient.send(
            new ScanCommand({
                TableName: this.tableName,
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
        await this.savePokemon(pokemon);
    }

    private async getMetadata(pk: string): Promise<PokemonMetadataItem> {
        const response = await docClient.send(
            new GetCommand({
                TableName: this.tableName,
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
                TableName: this.tableName,
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

    private buildPk(id: string): string {
        return `${POKEMON_ITEM.PK_PREFIX}#${id}`;
    }

    private async savePokemon(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);

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
