import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import type { PokemonService } from "../../services/pokemonService";
import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import type { ApiRequest, ApiResponse } from "../../global/types/api";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { handleRequest } from "../utils/handleRequest";
import { HTTP } from "../../global/constants/httpStatus";
import { createPokemonSchema } from "../../validators/pokemonSchema";
import { validateSchema } from "../../validators/schemaValidator";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const createPokemonHandler = async (event: ApiRequest): Promise<ApiResponse> => {
    return handleRequest(async () => {
        if (!event.body) {
            throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
        }

        const payload = JSON.parse(event.body);
        const validatedPayload = validateSchema(createPokemonSchema, payload);

        const pokemon = await service.createPokemon(validatedPayload);
        return toPokemonResponseDto(pokemon);
    }, HTTP.CREATED);
};
