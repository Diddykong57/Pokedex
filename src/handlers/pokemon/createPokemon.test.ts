import { createPokemonHandler } from "./createPokemon";
import { getFakeDb, LocalPokemonRepository } from "../../repositories/impl/local/localPokemonRepository";
import { PokemonServiceImpl } from "../../services/impl/pokemonServiceImpl";

describe("handler - create pokemon", () => {
    beforeEach(() => {
        getFakeDb().splice(0);
    });

    it("should create a pokemon and return code 201", async () => {
        const repository = new LocalPokemonRepository();
        const service = new PokemonServiceImpl(repository);

        const response = await createPokemonHandler(service, {
            body: JSON.stringify({
                name: "Pikachu",
                types: ["Electric"],
                description:
                    "Petit et jaune auux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
                region: "Kanto",
                level: 100,
                hp: 380,
                attack: 250,
                defense: 180,
            }),
        });

        const parseBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(201);
        expect(parseBody.name).toEqual("Pikachu");

        const db = getFakeDb();

        expect(db.length).toBe(2);

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
        expect(metadataItem.GSI1PK).toBe("POKEMON");
        expect(metadataItem.GSI1SK).toBe("Pikachu");

        expect(statsItem.PK).toContain("POKEMON#");
        expect(statsItem.entityType).toBe("POKEMON_STATS");
    });
});
