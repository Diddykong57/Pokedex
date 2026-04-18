import type { Pokemon } from "../../../models/pokemon";
import { toPokemonItems } from "../../../mappers/pokemonMapper";
import type { PokemonRepository } from "../../pokemonRepository";

export class DynamoPokemonRepository implements PokemonRepository {
    async create(pokemon: Pokemon): Promise<void> {
        const [metadataItem, statsItem] = toPokemonItems(pokemon);

        // Add in DynamoDB
    }
}
