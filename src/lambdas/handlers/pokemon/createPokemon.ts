import type { PokemonService } from "../../services/pokemonService";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { createPokemonSchema } from "../../validators/pokemonSchema";
import { validateSchema } from "../../validators/schemaValidator";
import { APIGatewayProxyEvent } from "aws-lambda";
import { PokemonResponseDto } from "../../dto/pokemon/pokemonResponse.dto";
import { publisher } from "../../../events/rewards";

export const createPokemonHandler = async (
    service: PokemonService,
    userId: string,
    event: APIGatewayProxyEvent
): Promise<PokemonResponseDto> => {
    if (!event.body) {
        throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
    }

    const payload = JSON.parse(event.body);
    const validatedPayload = validateSchema(createPokemonSchema, payload);

    const pokemon = await service.createPokemon(userId, validatedPayload);
    if (process.env.APP_ENV !== "test") {
        await publisher();
    }
    return toPokemonResponseDto(pokemon);
};
