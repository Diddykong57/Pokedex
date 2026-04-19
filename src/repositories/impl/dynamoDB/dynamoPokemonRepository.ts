import type { Pokemon } from "../../../models/pokemon";
import { toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";
import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    UpdateCommand,
    PutCommand,
    DynamoDBDocumentClient,
    ScanCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

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
}
