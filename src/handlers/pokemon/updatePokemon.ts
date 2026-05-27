import type { PokemonService } from "../../services/pokemonService";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { validateSchema } from "../../validators/schemaValidator";
import { updatePokemonSchema } from "../../validators/pokemonSchema";
import { APIGatewayProxyEvent } from "aws-lambda";
import { PokemonResponseDto } from "../../dto/pokemon/pokemonResponse.dto";

export const updatePokemonHandler = async (
    service: PokemonService,
    userId: string,
    event: APIGatewayProxyEvent
): Promise<PokemonResponseDto> => {
    if (!event.body) {
        throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
    }

    const pokemonId = event.pathParameters?.id;
    if (!pokemonId) {
        throw badRequestError(ERROR_MESSAGES.MISSING_ID);
    }

    const payload = JSON.parse(event.body);
    const validatedPayload = validateSchema(updatePokemonSchema, payload);

    const pokemon = await service.updatePokemon(userId, pokemonId, validatedPayload);
    return toPokemonResponseDto(pokemon);
};
