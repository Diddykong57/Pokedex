import {createPokemonHandler} from "./createPokemon";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";
import {getPokemonDetailsHandler} from "./getPokemonDetails";
import {getPokemonListHandler} from "./getPokemonList";
import type {PokemonRepository} from "../../repositories/pokemonRepository";
import {DynamoPokemonRepository} from "../../repositories/impl/dynamoDB/dynamoPokemonRepository";
import {LocalPokemonRepository} from "../../repositories/impl/local/localPokemonRepository";
import type {PokemonService} from "../../services/pokemonService";
import {PokemonServiceImpl} from "../../services/impl/pokemonServiceImpl";

const repository: PokemonRepository =
    process.env.APP_ENV === "aws"
        ? new DynamoPokemonRepository()
        : new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const handler = async (event) => {
    switch (event.httpMethod) {
        case "POST":
            return createPokemonHandler(service, event);
        case "GET":
            return getPokemonListHandler(service);

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: ERROR_MESSAGES.INVALID_METHOD,
                }),
            };
    }
};