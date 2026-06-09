import { getPokemonListHandler } from "../../handlers/pokemon/getPokemonList";
import { createPokemonHandler } from "../../handlers/pokemon/createPokemon";
import { getFakeDb, LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";
import { pokemonCreateFixture } from "../fixtures/pokemon";
import { buildApiEvent } from "../fixtures/buildApiEvent";
import {describe, expect} from '@jest/globals';

describe("getPokemonList", () => {
    const userId = "user-001";

    beforeEach(async () => {
        getFakeDb().splice(0);

        const repository = new LocalPokemonRepository();
        const service = new PokemonServiceImpl(repository);

        await createPokemonHandler(service, userId, buildApiEvent({ body: JSON.stringify(pokemonCreateFixture[0]) }));

        await createPokemonHandler(service, userId, buildApiEvent({ body: JSON.stringify(pokemonCreateFixture[1]) }));

        await createPokemonHandler(service, userId, buildApiEvent({ body: JSON.stringify(pokemonCreateFixture[2]) }));

        await createPokemonHandler(service, userId, buildApiEvent({ body: JSON.stringify(pokemonCreateFixture[3]) }));
    });

    it("should return a pokemon list", async () => {
        const repository = new LocalPokemonRepository();
        const service = new PokemonServiceImpl(repository);

        const response = await getPokemonListHandler(service, userId);

        expect(response).toHaveLength(4);
    });
});
