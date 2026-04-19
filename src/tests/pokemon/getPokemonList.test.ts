import { handler as getPokemonListHandler } from "../../handlers/pokemon/getPokemonList";
import { handler as createPokemonHandler } from "../../handlers/pokemon/createPokemon";
import { pokemonCreateFixture } from "../fixtures/pokemon";

describe("getPokemonList", () => {
    beforeEach(async () => {
        await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[0]) });
        await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[1]) });
        await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[2]) });
        await createPokemonHandler({ body: JSON.stringify(pokemonCreateFixture[3]) });
    });

    it("should return a pokemon list and status 200", async () => {
        const response = await getPokemonListHandler();
        const parsedBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(200);
        expect(parsedBody).toHaveLength(4);
    });
});
