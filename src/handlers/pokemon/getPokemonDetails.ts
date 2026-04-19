import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import type { PokemonService } from "../../services/pokemonService";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import type {ApiRequest, ApiResponse} from "../../global/types/api";
import { handleRequest } from "../utils/handleRequest";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import {badRequestError} from "../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const getPokemonDetailsHandler = async (event: ApiRequest): Promise<ApiResponse> => {
    return handleRequest(async () => {
        const id = event.pathParameters?.id;
        if (!id) {
            throw badRequestError(ERROR_MESSAGES.MISSING_ID);
        }
        const pokemon = await service.getPokemonDetails(id);
        return toPokemonResponseDto(pokemon);
    });
};
