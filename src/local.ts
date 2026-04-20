import {getFakeDb, LocalPokemonRepository} from "./repositories/impl/local/localPokemonRepository";
import { createPokemonHandler } from "./handlers/pokemon/createPokemon";
import { getPokemonListHandler } from "./handlers/pokemon/getPokemonList";
import { getPokemonDetailsHandler } from "./handlers/pokemon/getPokemonDetails";
import { updatePokemonHandler } from "./handlers/pokemon/updatePokemon";
import { pokemonCreateFixture, pokemonUpdateFixture } from "./tests/fixtures/pokemon";
import type { ApiResponse } from "./global/types/api";
import {deletePokemonHandler} from "./handlers/pokemon/deletePokemon";
import type {PokemonRepository} from "./repositories/pokemonRepository";
import {DynamoPokemonRepository} from "./repositories/impl/dynamoDB/dynamoPokemonRepository";
import type {PokemonService} from "./services/pokemonService";
import {PokemonServiceImpl} from "./services/impl/pokemonServiceImpl";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Content-Type": "application/json"
}



const repository: PokemonRepository =
    process.env.APP_ENV === "aws"
        ? new DynamoPokemonRepository()
        : new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

async function main() {
    let response: ApiResponse;
    response = await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[0]) });

    console.log("[getPokemonListHandler[0]] HTTP response:");
    console.log(response);

    await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[1]) });
    await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[2]) });
    await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[3]) });
    response = await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[0]) });

    console.log("[getPokemonListHandler[4]] HTTP response:");
    console.log(response);

    response = await getPokemonListHandler(service);

    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);

    const parsedBody = JSON.parse(response.body);
    const id = parsedBody[0].id;

    response = await getPokemonDetailsHandler(service, {pathParameters: {id}});

    console.log("[getPokemonDetailsHandler] HTTP response:");
    console.log(response);

    response = await updatePokemonHandler(service, {
        pathParameters: {
            id,
        },
        body: JSON.stringify(pokemonUpdateFixture),
    });

    console.log("[updatePokemonHandler] HTTP response:");
    console.log(response);

    response = await deletePokemonHandler(service, {pathParameters: {id}});

    console.log("[deletePokemonHandler] HTTP response:");
    console.log(response);

    response = await getPokemonListHandler(service);

    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);


    // console.log("Fake DB content:");
    // console.dir(getFakeDb(), { depth: null });
}

main();
