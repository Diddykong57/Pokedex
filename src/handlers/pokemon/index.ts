import type { APIGatewayProxyEvent } from "aws-lambda";
import { createPokemonHandler } from "./createPokemon";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { getPokemonDetailsHandler } from "./getPokemonDetails";
import { getPokemonListHandler } from "./getPokemonList";
import type { PokemonRepository } from "../../repositories/pokemonRepository";
import { DynamoPokemonRepository } from "../../repositories/impl/dynamoDB/dynamoPokemonRepository";
import { LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import type { PokemonService } from "../../services/pokemonService";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import { updatePokemonHandler } from "./updatePokemon";
import { deletePokemonHandler } from "./deletePokemon";
import { handleRequest } from "../utils/handleRequest";
import { getAuthContext } from "../utils/authMiddleware";
import { badRequestError } from "../../utils/errorUtils";
import { HTTP } from "../../global/constants/httpStatus";

const repository: PokemonRepository =
    process.env.APP_ENV === "aws" ? new DynamoPokemonRepository() : new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const pokemonMainHandler = async (event: APIGatewayProxyEvent) => {
    switch (event.httpMethod) {
        case "POST":
            return handleRequest( async () => {
                const auth = getAuthContext(event);
                return createPokemonHandler(service, auth.userId, event);
            }, HTTP.CREATED)
        case "GET":
            return handleRequest( async () => {
                const auth = getAuthContext(event);
                if (event.pathParameters?.id) {
                    return getPokemonDetailsHandler(service, auth.userId, event.pathParameters.id);
                }
                return getPokemonListHandler(service, auth.userId);
            })
        case "PUT":
            return handleRequest( async () => {
                const auth = getAuthContext(event);
                return updatePokemonHandler(service, auth.userId, event);
            })
        case "DELETE":
            return handleRequest( async () => {
                const auth = getAuthContext(event);
                return deletePokemonHandler(service, auth.userId, event);
            }, HTTP.NO_CONTENT)

        default:
            return handleRequest(async () => {
                throw badRequestError(ERROR_MESSAGES.INVALID_METHOD);
            })
    }
};
