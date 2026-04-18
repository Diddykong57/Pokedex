import { handler } from "../../handlers/pokemon/createPokemon";
import { getFakeDb } from "../../repositories/impl/local/localPokemonRepository";

describe("createPokemon", () => {
    it("should create a pokemon and store it", async () => {
        const response = await handler({
            body: JSON.stringify({
                name: "Pikachu",
                types: ["Electric"],
                description:
                    "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
                region: "Kanto",
                maxLevel: 100,
                maxHp: 380,
                maxAttack: 250,
                maxDefense: 180,
            }),
        });

        const parsedBody = JSON.parse(response.body);

        // check HTTP response
        expect(response.statusCode).toBe(201);
        expect(parsedBody.name).toBe("Pikachu");

        // check persistance
        const db = getFakeDb();

        expect(db.length).toBe(2); // METADATA + STATS

        const metadataItem = db.find(item => item.SK === "METADATA");
        const statsItem = db.find(item => item.SK === "STATS");

        expect(metadataItem).toBeDefined();
        expect(statsItem).toBeDefined();

        if (!metadataItem || metadataItem.SK !== "METADATA") {
            throw new Error("metadataItem not found");
        }

        if (!statsItem || statsItem.SK !== "STATS") {
            throw new Error("statsItem not found");
        }

        expect(metadataItem.PK).toContain("POKEMON#");
        expect(metadataItem.SK).toBe("METADATA");
        expect(metadataItem.GSI1PK).toBe("POKEMON");
        expect(metadataItem.GSI1SK).toBe("Pikachu");

        expect(statsItem.PK).toContain("POKEMON#");
        expect(statsItem.SK).toBe("STATS");
        expect(statsItem.entityType).toBe("POKEMON_STATS");
    });
});
