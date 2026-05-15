import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { PokemonServiceImpl } from "./pokemonServiceImpl";
import { PokemonRepository } from "../../repositories/pokemonRepository";

describe("pokemonService", () => {
    it("should build pokemon then call pokemonRepository.create", async () => {
        const createMock = jest.fn().mockResolvedValue(undefined);

        // create fake repo (= mock)
        const pokemonRepository = {
            create: createMock,
            getPokemonDetailsByName: jest.fn(),
        } as unknown as PokemonRepository;

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

        expect(createMock).toHaveBeenCalledTimes(1);

        const pokemonSent = createMock.mock.calls[0][0];

        expect(pokemonSent.id).toEqual(expect.any(String));
        expect(pokemonSent.createdAt).toEqual(expect.any(String));
        expect(pokemonSent.name).toBe("Pikachu");
    });
});
