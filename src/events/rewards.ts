import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { PokemonService } from "../lambdas/services/pokemonService";

interface PokemonAddedEventDetails {
    userId: string,
    nbOfPokemonOwned: number
}

export const publisher = async (details: PokemonAddedEventDetails): Promise<void> => {
    const config = {
        region: "eu-west-3"
    };
    const client = new EventBridgeClient(config);
    const input = {
        Entries: [
            {
                Source: "pokedex.pokemon",
                DetailType: "pokemon-added",
                Detail: JSON.stringify(details),
                EventBusName: "pokedexBus",
            },
        ],
    };
    const command = new PutEventsCommand(input);
    await client.send(command);
}

export const buildPokemonDetailEvent = async (service: PokemonService, userId: string): Promise<PokemonAddedEventDetails> => {
    const nbOfPokemonOwned = await service.getNumberOfPokemonAdded(userId)
    return {
        userId,
        nbOfPokemonOwned
    }
}