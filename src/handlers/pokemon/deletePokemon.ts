import type { PokemonService } from "../../services/pokemonService";
import type { ApiResponse } from "../../global/types/api";
import { handleRequest } from "../utils/handleRequest";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { HTTP } from "../../global/constants/httpStatus";
import type { APIGatewayProxyEvent } from "aws-lambda";

export const deletePokemonHandler = async (service: PokemonService, event: APIGatewayProxyEvent): Promise<ApiResponse> => {
    return handleRequest(async () => {
        const id = event.pathParameters?.id;
        if (!id) {
            throw badRequestError(ERROR_MESSAGES.MISSING_ID);
        }
        await service.deletePokemon(id);
    }, HTTP.NO_CONTENT);
};
