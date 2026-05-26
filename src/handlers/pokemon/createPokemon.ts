import type { PokemonService } from "../../services/pokemonService";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import type { ApiResponse } from "../../global/types/api";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { handleRequest } from "../utils/handleRequest";
import { HTTP } from "../../global/constants/httpStatus";
import { createPokemonSchema } from "../../validators/pokemonSchema";
import { validateSchema } from "../../validators/schemaValidator";
import { APIGatewayProxyEvent } from "aws-lambda";

export const createPokemonHandler = async (service: PokemonService, event: APIGatewayProxyEvent): Promise<ApiResponse> => {
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
