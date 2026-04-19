import { handler as createPokemonHandler } from "./handlers/pokemon/createPokemon";
import { getFakeDb } from "./repositories/impl/local/localPokemonRepository";
import {handler} from "./handlers/pokemon/getPokemonList";
import {pokemonFixture} from "./tests/fixtures/pokemon";

async function main() {
    await createPokemonHandler({body: JSON.stringify(pokemonFixture[0])});
    await createPokemonHandler({body: JSON.stringify(pokemonFixture[1])});
    await createPokemonHandler({body: JSON.stringify(pokemonFixture[2])});
    await createPokemonHandler({body: JSON.stringify(pokemonFixture[3])});

    const response = await handler();

    console.log("HTTP response:");
    console.log(response);
    // console.log("Fake DB content:");
    // console.dir(getFakeDb(), { depth: null });
}

main();
