import {createPokemonHandler} from "./createPokemon";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";

export const handler = async (event) => {
    switch (event.httpMethod) {
        case "POST":
            return createPokemonHandler(event);

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: ERROR_MESSAGES.INVALID_METHOD,
                }),
            };
    }
};