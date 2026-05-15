import { getPokemonListHandler } from "../../handlers/pokemon/getPokemonList";
import { createPokemonHandler } from "../../handlers/pokemon/createPokemon";
import { getFakeDb, LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import { pokemonCreateFixture } from "../fixtures/pokemon";

describe("getPokemonList", () => {
    beforeEach(async () => {
        getFakeDb().splice(0);

        const repository = new LocalPokemonRepository();
        const service = new PokemonServiceImpl(repository);

        await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[0]) });
        await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[1]) });
        await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[2]) });
        await createPokemonHandler(service, { body: JSON.stringify(pokemonCreateFixture[3]) });
    });

    it("should return a pokemon list and status 200", async () => {
        const repository = new LocalPokemonRepository();
        const service = new PokemonServiceImpl(repository);

        const response = await getPokemonListHandler(service);
        const parsedBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(200);
        expect(parsedBody).toHaveLength(4);
    });
});
