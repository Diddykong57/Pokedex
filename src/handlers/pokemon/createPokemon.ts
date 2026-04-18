import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import type { PokemonService } from "../../services/pokemonService";
import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import type {ApiRequest, ApiResponse} from "../../global/types/api";
import {badRequestError} from "../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";
import {toApiErrorResponse} from "../../mappers/errorMapper";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const handler = async (event: ApiRequest): Promise<ApiResponse> => {
    try {
        if (!event.body) {
            throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
        }

        const data = JSON.parse(event.body) as CreatePokemonRequestDto;
        const pokemon = await service.createPokemon(data);
        const response = toPokemonResponseDto(pokemon);

        return {
            statusCode: 201,
            body: JSON.stringify(response),
        };
    } catch (error: unknown) {
        return toApiErrorResponse(error);
    }
};


