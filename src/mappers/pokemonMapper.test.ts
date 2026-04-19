import type { Pokemon } from "../models/pokemon";
import { toPokemonItems } from "./pokemonMapper";
import { LocalPokemonRepository } from "../repositories/impl/local/localPokemonRepository";

describe("toPokemonItems", () => {
    it("should map a Pokemon into metadata and stats items", () => {
        const id = "123";
        const now = "2026-04-18T10:00:00.000Z";

        const pokemon: Pokemon = {
            id: id,
            name: "Pikachu",
            types: ["Electric"],
            description:
                "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
            region: "Kanto",
            maxLevel: 100,
            maxHp: 380,
            maxAttack: 250,
            maxDefense: 180,
            createdAt: now,
        };

        const result = toPokemonItems(pokemon);

        expect(result.length).toBe(2);

        const [metadataItem, statsItem] = result;

        expect(metadataItem.PK).toContain("POKEMON#");
        expect(metadataItem.SK).toBe("METADATA");
        expect(metadataItem.GSI1PK).toBe("POKEMON");
        expect(metadataItem.GSI1SK).toBe("Pikachu");
        expect(metadataItem.entityType).toBe("POKEMON_METADATA");
        expect(metadataItem.name).toBe("Pikachu");
        expect(metadataItem.types).toEqual(["Electric"]);
        expect(metadataItem.description).toBe(
            "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques"
        );
        expect(metadataItem.region).toBe("Kanto");
        expect(metadataItem.createdAt).toEqual(now);

        expect(statsItem.PK).toContain("POKEMON#");
        expect(statsItem.SK).toBe("STATS");
        expect(statsItem.entityType).toBe("POKEMON_STATS");
        expect(statsItem.maxLevel).toBe(100);
        expect(statsItem.maxHp).toBe(380);
        expect(statsItem.maxAttack).toBe(250);
        expect(statsItem.maxDefense).toBe(180);
    });
});

describe("getPokemonList", () => {
    it("should only return pokemon metadata", async () => {
        const repository = new LocalPokemonRepository();

        const result = await repository.getPokemonList();

        expect(result.every(metadata => metadata.GSI1PK === "POKEMON")).toEqual(true);
        expect(result.every(pokemon => pokemon.name)).toBe(true);
    });
});
