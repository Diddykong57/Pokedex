import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import type { PokemonService } from "../../services/pokemonService";
import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import type {ApiRequest, ApiResponse} from "../../global/types/api";
import {badRequestError} from "../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";
import {handleRequest} from "../utils/handleRequest";
import {HTTP} from "../../global/constants/httpStatus";
import type {PokemonResponseDto} from "../../dto/pokemon/pokemonResponse.dto";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const handler = async (event: ApiRequest): Promise<ApiResponse> => {
    return handleRequest(async (): Promise<PokemonResponseDto> => {
        if (!event.body) {
            throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
        }

        const data = JSON.parse(event.body) as CreatePokemonRequestDto;
        const pokemon = await service.createPokemon(data);

        return toPokemonResponseDto(pokemon);
    }, HTTP.CREATED);
};
