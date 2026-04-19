import { getFakeDb } from "./repositories/impl/local/localPokemonRepository";
import { createPokemonHandler } from "./handlers/pokemon/createPokemon";
import { getPokemonListHandler} from "./handlers/pokemon/getPokemonList";
import { getPokemonDetailsHandler} from "./handlers/pokemon/getPokemonDetails";
import { updatePokemonHandler} from "./handlers/pokemon/updatePokemon";
import {pokemonCreateFixture, pokemonUpdateFixture} from "./tests/fixtures/pokemon";
import type {ApiResponse} from "./global/types/api";

async function main() {
    let response: ApiResponse;
    await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[0]) });
    await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[1]) });
    await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[2]) });
    await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[3]) });

    response = await getPokemonListHandler();

    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);

    const parsedBody = JSON.parse(response.body);
    const id = parsedBody[0].id;

    response = await getPokemonDetailsHandler(id);

    console.log("[getPokemonDetailsHandler] HTTP response:");
    console.log(response);

    response = await updatePokemonHandler({
        pathParameters: {
            id,
        },
        body: JSON.stringify(pokemonUpdateFixture),
    });

    console.log("[updatePokemonHandler] HTTP response:");
    console.log(response);
    // console.log("Fake DB content:");
    // console.dir(getFakeDb(), { depth: null });
}

main();
