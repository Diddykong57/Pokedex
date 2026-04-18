import {handler} from "./createPokemon";

describe("handler - create pokemon", () => {
    it("should create a pokemon and return code 201",async () => {
        const payload = {
            body: JSON.stringify({
                name: "Pikachu",
                types: ["Electric"],
                description: "Petit et jaune auux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
                region: "Kanto",
                maxLevel: 100,
                maxHp: 380,
                maxAttack: 250,
                maxDefense: 180,
            }),
        }
        const response = await handler(payload);
        const parseBody = JSON.parse(response.body)

        expect(response.statusCode).toBe(201);
        expect(parseBody.name).toEqual("Pikachu");
    })

    it("should return 400 when body is null", async () => {
        const payload = {
            body: null,
        }
        const response = await handler(payload);
        const parseBody = JSON.parse(response.body)

        expect(response.statusCode).toBe(400);
        expect(parseBody.name).toEqual(undefined);
    });

    // To add with Joi feature
    // it("should return 400 when body corrupted", async () => {
    //     const payload = {
    //         body: JSON.stringify({
    //             name: "Pikachu",
    //             types: ["Electric"],
    //             description: "Petit et jaune auux joues rouges et à la queue en éclair, capable de lancer des décharges électriques",
    //             region: "Kanto",
    //             maxLevel: 100,
    //             maxHp: 380,
    //             maxAttack: 250,
    //             maxDefense: 180,
    //             nickname: "PikaPika"
    //         }),
    //     }
    //     const response = await handler(payload);
    //     const parseBody = JSON.parse(response.body)
    //
    //     expect(response.statusCode).toBe(400);
    //     expect(parseBody.name).toEqual(undefined);
    // });
})