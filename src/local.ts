import { handler } from "./handlers/pokemon/createPokemon";
import {getFakeDb} from "./repositories/impl/local/localPokemonRepository";

async function main() {
    const response = await handler({
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
    });

    console.log("HTTP response:");
    console.log(response);

    console.log("Fake DB content:");
    console.dir(getFakeDb(), { depth: null });
}

main();