import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { PokemonServiceImpl } from "./pokemonServiceImpl";

describe("pokemonService", () => {
    it("should build pokemon then call pokemonRepository.create", async () => {
        // create fake repo (= mock)
        const pokemonRepository = {
            create: jest.fn().mockResolvedValue(undefined),
        };
        const service = new PokemonServiceImpl(pokemonRepository);

        const data: CreatePokemonRequestDto = {
            name: "Pikachu",
            types: ["Electric"],
            description:
                "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
            region: "Kanto",
            maxLevel: 100,
            maxHp: 380,
            maxAttack: 250,
            maxDefense: 180,
        };

        await service.createPokemon(data);

        expect(pokemonRepository.create).toHaveBeenCalledTimes(1);

        const pokemonSent = pokemonRepository.create.mock.calls[0][0];

        expect(pokemonSent.id).toEqual(expect.any(String));
        expect(pokemonSent.createdAt).toEqual(expect.any(String));
        expect(pokemonSent.name).toBe("Pikachu");
    });
});
