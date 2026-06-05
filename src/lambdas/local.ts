import { getFakeDb } from "./repositories/impl/local/localPokemonRepository";
import { pokemonCreateFixture, pokemonUpdateFixture } from "./tests/fixtures/pokemon";
import type { ApiResponse } from "./global/types/api";
import { getFakeUserDb } from "./repositories/impl/local/localUserRepository";
import { userCreateFixture } from "./tests/fixtures/user";
import { buildApiEvent } from "./tests/fixtures/buildApiEvent";
import { userMainHandler } from "./handlers/user";
import { pokemonMainHandler } from "./handlers/pokemon";

async function main() {
    let response: ApiResponse;

    // Create 1st pokemon
    console.log("**************************");
    console.log("*** Create 1st pokemon ***");
    console.log("**************************");
    response = await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(pokemonCreateFixture[0]),
        })
    );

    const pokemonBody = JSON.parse(response.body) as { id: string };
    const pokemonId = pokemonBody.id;

    console.log("[createPokemonListHandler[0]] HTTP response:");
    console.log(response);

    console.log("Fake DB content:");
    console.dir(getFakeDb(), { depth: null });

    // Create more Pokemon
    console.log("***************************");
    console.log("*** Create more Pokemon ***");
    console.log("***************************");
    await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(pokemonCreateFixture[1]),
        })
    );
    await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(pokemonCreateFixture[2]),
        })
    );
    await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(pokemonCreateFixture[3]),
        })
    );

    // Create duplicate Pokemon
    console.log("********************************");
    console.log("*** Create duplicate Pokemon ***");
    console.log("********************************");
    response = await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(pokemonCreateFixture[1]),
        })
    );
    console.log("[getPokemonListHandler[4]] HTTP response:");
    console.log(response);

    // Get one Pokemon
    console.log("***********************");
    console.log("*** Get one Pokemon ***");
    console.log("***********************");
    response = await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "GET",
            pathParameters: {
                id: pokemonId,
            },
        })
    );
    console.log("[getPokemonDetailsHandler] HTTP response:");
    console.log(response);

    // Get all Pokemon
    console.log("***********************");
    console.log("*** Get all Pokemon ***");
    console.log("***********************");
    response = await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "GET",
        })
    );
    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);

    // Update a Pokemon
    console.log("************************");
    console.log("*** Update a Pokemon ***");
    console.log("************************");
    response = await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "PUT",
            pathParameters: {
                id: pokemonId,
            },
            body: JSON.stringify(pokemonUpdateFixture),
        })
    );
    console.log("[updatePokemonHandler] HTTP response:");
    console.log(response);

    // Delete a Pokemon
    console.log("************************");
    console.log("*** Delete a Pokemon ***");
    console.log("************************");

    response = await pokemonMainHandler(
        buildApiEvent({
            httpMethod: "DELETE",
            pathParameters: {
                id: pokemonId,
            },
            body: JSON.stringify(pokemonUpdateFixture),
        })
    );
    console.log("[deletePokemonHandler] HTTP response:");
    console.log(response);

    console.log(" ------------------------- ");

    // Create a User
    console.log("*********************");
    console.log("*** Create a User ***");
    console.log("*********************");

    response = await userMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(userCreateFixture[0]),
        })
    );
    console.log("[createUserHandler[0]] HTTP response:");
    console.log(response);

    console.log("Fake DB content:");
    console.dir(getFakeUserDb(), { depth: null });

    // Create more User
    console.log("************************");
    console.log("*** Create more User ***");
    console.log("************************");
    await userMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(userCreateFixture[1]),
        })
    );
    response = await userMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            body: JSON.stringify(userCreateFixture[2]),
        })
    );

    const userBody = JSON.parse(response.body) as { id: string; email: string };

    // Get one User
    console.log("********************");
    console.log("*** Get one User ***");
    console.log("********************");
    response = await userMainHandler(
        buildApiEvent({
            httpMethod: "GET",
            requestContext: {
                authorizer: {
                    claims: {
                        sub: userBody.id,
                        email: userBody.email,
                        "cognito:groups": "",
                    },
                },
            },
        })
    );
    console.log("[getUserDetailsHandler] HTTP response:");
    console.log(response);

    // User create User
    console.log("************************");
    console.log("*** User create User ***");
    console.log("************************");
    response = await userMainHandler(
        buildApiEvent({
            httpMethod: "POST",
            requestContext: {
                authorizer: {
                    claims: {
                        sub: userBody.id,
                        email: userBody.email,
                        "cognito:groups": "",
                    },
                },
            },
            body: JSON.stringify(userCreateFixture[0]),
        })
    );
    console.log("[createUserHandler[0]] HTTP response:");
    console.log(response);
}

main();
