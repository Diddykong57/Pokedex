import { getFakeDb } from "../../repositories/impl/local/localPokemonRepository";
import { buildApiEvent } from "../fixtures/buildApiEvent";
import { pokemonMainHandler } from "../../handlers/pokemon";
import { PokemonMetadataItem, PokemonStatsItem } from "../../repositories/types/pokemonItem";

describe("createPokemon", () => {
    beforeEach(() => {
        getFakeDb().splice(0);
    });

    it("should create a pokemon attached to a user and store metadata + stats", async () => {
        const userId = "user-001";

        const response = await pokemonMainHandler(
            buildApiEvent({
                httpMethod: "POST",
                body: JSON.stringify({
                    name: "Pikachu",
                    types: ["Electric"],
                    description:
                        "Petit et jaune aux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
                    region: "Kanto",
                    level: 100,
                    hp: 380,
                    attack: 250,
                    defense: 180,
                }),
                requestContext: {
                    authorizer: {
                        claims: {
                            sub: userId,
                            "cognito:groups": "user",
                        },
                    },
                }
            })
        );

        expect(response.statusCode).toBe(201);

        const body = JSON.parse(response.body);
        expect(body.name).toBe("Pikachu");

        const db = getFakeDb();

        expect(db.length).toBe(2);

        const metadataItem = db.find(
            (item): item is PokemonMetadataItem =>
                item.entityType === "USER_POKEMON_METADATA" &&
                item.SK.startsWith("POKEMON#METADATA#")
        );

        const statsItem = db.find(
            (item): item is PokemonStatsItem =>
                item.entityType === "USER_POKEMON_STATS" &&
                item.SK.startsWith("POKEMON#STATS#")
        );

        expect(metadataItem).toBeDefined();
        expect(statsItem).toBeDefined();

        if (!metadataItem || !metadataItem.SK.startsWith("POKEMON#METADATA#")) {
            throw new Error("metadataItem not found");
        }

        if (!statsItem || !statsItem.SK.startsWith("POKEMON#STATS#")) {
            throw new Error("statsItem not found");
        }

        expect(metadataItem.PK).toBe(`USER#${userId}`);
        expect(metadataItem.GSI1PK).toBe("POKEMON");
        expect(metadataItem.GSI1SK).toBe("Pikachu");
        expect(metadataItem.entityType).toBe("USER_POKEMON_METADATA");

        expect(statsItem.PK).toBe(`USER#${userId}`);
        expect(statsItem.entityType).toBe("USER_POKEMON_STATS");
    });
});