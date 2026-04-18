import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import type { PokemonService } from "../../services/pokemonService";
import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const handler = async (event: { body: string | null }): Promise<{ statusCode: number; body: string }> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing body" }),
            };
        }

        const data = JSON.parse(event.body) as CreatePokemonRequestDto;

        const pokemon = await service.createPokemon(data);
        const response = toPokemonResponseDto(pokemon);

        return {
            statusCode: 201,
            body: JSON.stringify(response),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
