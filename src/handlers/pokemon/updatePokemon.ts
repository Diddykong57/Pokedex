import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import type { PokemonService } from "../../services/pokemonService";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import type {ApiRequest, ApiResponse} from "../../global/types/api";
import { handleRequest } from "../utils/handleRequest";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import {badRequestError} from "../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";
import {validateSchema} from "../../validators/schemaValidator";
import {updatePokemonSchema} from "../../validators/pokemonSchema";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const handler = async (event: ApiRequest): Promise<ApiResponse> => {
    return handleRequest(async () => {
        if (!event.body) {
            throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
        }

        const id = event.pathParameters?.id;
        if (!id) {
            throw badRequestError(ERROR_MESSAGES.MISSING_ID);
        }

        const payload = JSON.parse(event.body);
        const validatedPayload = validateSchema(updatePokemonSchema, payload);

        const pokemon = await service.updatePokemon(id, validatedPayload);
        return toPokemonResponseDto(pokemon);
    });
};
