import type { PokemonService } from "../../services/pokemonService";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import type { APIGatewayProxyEvent } from "aws-lambda";

export const deletePokemonHandler = async (
    service: PokemonService,
    userId: string,
    event: APIGatewayProxyEvent
): Promise<void> => {
    const pokemonId = event.pathParameters?.id;
    if (!pokemonId) {
        throw badRequestError(ERROR_MESSAGES.MISSING_ID);
    }
    await service.deletePokemon(userId, pokemonId);
};
