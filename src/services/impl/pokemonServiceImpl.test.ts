import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { PokemonServiceImpl } from "./pokemonServiceImpl";
import { PokemonRepository } from "../../repositories/pokemonRepository";

describe("pokemonService", () => {
    it("should build pokemon then call pokemonRepository.create", async () => {
        const createMock = jest.fn().mockResolvedValue(undefined);
        const getPokemonDetailsByNameMock = jest.fn().mockResolvedValue(null);

        const pokemonRepository = {
            create: createMock,
            getPokemonDetailsByName: getPokemonDetailsByNameMock,
        } as unknown as PokemonRepository;

        const service = new PokemonServiceImpl(pokemonRepository);

        const userId = "user-001";

        const data: CreatePokemonRequestDto = {
            name: "Pikachu",
            types: ["Electric"],
            description:
                "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
            region: "Kanto",
            level: 100,
            hp: 380,
            attack: 250,
            defense: 180,
        };

        await service.createPokemon(userId, data);

        expect(getPokemonDetailsByNameMock).toHaveBeenCalledWith(userId, "Pikachu");
        expect(createMock).toHaveBeenCalledTimes(1);

        const [userIdSent, pokemonSent] = createMock.mock.calls[0];

        expect(userIdSent).toBe(userId);
        expect(pokemonSent.id).toEqual(expect.any(String));
        expect(pokemonSent.createdAt).toEqual(expect.any(String));
        expect(pokemonSent.name).toBe("Pikachu");
    });
});