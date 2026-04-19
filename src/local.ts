import { getFakeDb } from "./repositories/impl/local/localPokemonRepository";
import { handler as createPokemonHandler } from "./handlers/pokemon/createPokemon";
import { handler as getPokemonListHandler} from "./handlers/pokemon/getPokemonList";
import { handler as getPokemonDetailsHandler} from "./handlers/pokemon/getPokemonDetails";
import { pokemonFixture } from "./tests/fixtures/pokemon";
import type {ApiResponse} from "./global/types/api";

async function main() {
    let response: ApiResponse;
    await createPokemonHandler({ body: JSON.stringify(pokemonFixture[0]) });
    await createPokemonHandler({ body: JSON.stringify(pokemonFixture[1]) });
    await createPokemonHandler({ body: JSON.stringify(pokemonFixture[2]) });
    await createPokemonHandler({ body: JSON.stringify(pokemonFixture[3]) });

    response = await getPokemonListHandler();

    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);

    const parsedBody = JSON.parse(response.body);
    const id = parsedBody[0].id;

    response = await getPokemonDetailsHandler(id);

    console.log("[getPokemonDetailsHandler] HTTP response:");
    console.log(response);
    // console.log("Fake DB content:");
    // console.dir(getFakeDb(), { depth: null });
}

main();
