import type { Pokemon } from "../models/pokemon";
import { toPokemonItems } from "./pokemonMapper";
import { LocalPokemonRepository } from "../repositories/impl/local/localPokemonRepository";

describe("toPokemonItems", () => {
    it("should map a Pokemon into user metadata and stats items", () => {
        const userId = "user-001";
        const id = "123";
        const now = "2026-04-18T10:00:00.000Z";

        const pokemon: Pokemon = {
            id,
            name: "Pikachu",
            types: ["Electric"],
            description:
                "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
            region: "Kanto",
            level: 100,
            hp: 380,
            attack: 250,
            defense: 180,
            createdAt: now,
        };

        const result = toPokemonItems(userId, pokemon);

        expect(result.length).toBe(2);

        const [metadataItem, statsItem] = result;

        expect(metadataItem.PK).toBe(`USER#${userId}`);
        expect(metadataItem.SK).toBe(`POKEMON#METADATA#${id}`);
        expect(metadataItem.GSI1PK).toBe("POKEMON");
        expect(metadataItem.GSI1SK).toBe("Pikachu");
        expect(metadataItem.entityType).toBe("USER_POKEMON_METADATA");
        expect(metadataItem.userId).toBe(userId);
        expect(metadataItem.pokemonId).toBe(id);
        expect(metadataItem.name).toBe("Pikachu");
        expect(metadataItem.types).toEqual(["Electric"]);
        expect(metadataItem.description).toBe(
            "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques"
        );
        expect(metadataItem.region).toBe("Kanto");
        expect(metadataItem.createdAt).toEqual(now);

        expect(statsItem.PK).toBe(`USER#${userId}`);
        expect(statsItem.SK).toBe(`POKEMON#STATS#${id}`);
        expect(statsItem.entityType).toBe("USER_POKEMON_STATS");
        expect(statsItem.userId).toBe(userId);
        expect(statsItem.pokemonId).toBe(id);
        expect(statsItem.level).toBe(100);
        expect(statsItem.hp).toBe(380);
        expect(statsItem.attack).toBe(250);
        expect(statsItem.defense).toBe(180);
        expect(statsItem.createdAt).toEqual(now);
    });
});

describe("getPokemonList", () => {
    it("should only return pokemon metadata", async () => {
        const userId = "user-001";
        const repository = new LocalPokemonRepository();

        const result = await repository.getPokemonList(userId);

        expect(result.every(pokemon => pokemon.name)).toBe(true);
    });
});