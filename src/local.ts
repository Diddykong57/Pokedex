import { getFakeDb, LocalPokemonRepository } from "./repositories/impl/local/localPokemonRepository";
import { createPokemonHandler } from "./handlers/pokemon/createPokemon";
import { getPokemonListHandler } from "./handlers/pokemon/getPokemonList";
import { getPokemonDetailsHandler } from "./handlers/pokemon/getPokemonDetails";
import { updatePokemonHandler } from "./handlers/pokemon/updatePokemon";
import { pokemonCreateFixture, pokemonUpdateFixture } from "./tests/fixtures/pokemon";
import type { ApiResponse } from "./global/types/api";
import { deletePokemonHandler } from "./handlers/pokemon/deletePokemon";
import type { PokemonRepository } from "./repositories/pokemonRepository";
import { DynamoPokemonRepository } from "./repositories/impl/dynamoDB/dynamoPokemonRepository";
import type { PokemonService } from "./services/pokemonService";
import { PokemonServiceImpl } from "./services/impl/pokemonServiceImpl";
import { UserRepository } from "./repositories/userRepository";
import { getFakeUserDb, LocalUserRepository } from "./repositories/impl/local/localUserRepository";
import { UserService } from "./services/userService";
import { UserServiceImpl } from "./services/impl/userServiceImpl";
import { createUserHandler } from "./handlers/user/createUser";
import { userCreateFixture } from "./tests/fixtures/user";
import { getUserDetailsHandler } from "./handlers/user/getUser";

const pokemonRepository: PokemonRepository =
    process.env.APP_ENV === "aws" ? new DynamoPokemonRepository() : new LocalPokemonRepository();
const pokemonService: PokemonService = new PokemonServiceImpl(pokemonRepository);

const userRepository: UserRepository = new LocalUserRepository();
    // process.env.APP_ENV === "aws" ? new DynamoUserRepository() : new LocalUserRepository();
const userService: UserService = new UserServiceImpl(userRepository);

async function main() {
    let response: ApiResponse;
    response = await createPokemonHandler(pokemonService, { body: JSON.stringify(pokemonCreateFixture[0]) });

    console.log("[createPokemonListHandler[0]] HTTP response:");
    console.log(response);

    await createPokemonHandler(pokemonService, { body: JSON.stringify(pokemonCreateFixture[1]) });
    await createPokemonHandler(pokemonService, { body: JSON.stringify(pokemonCreateFixture[2]) });
    await createPokemonHandler(pokemonService, { body: JSON.stringify(pokemonCreateFixture[3]) });
    response = await createPokemonHandler(pokemonService, { body: JSON.stringify(pokemonCreateFixture[0]) });

    console.log("[getPokemonListHandler[4]] HTTP response:");
    console.log(response);

    response = await getPokemonListHandler(pokemonService);

    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);

    const parsedBody = JSON.parse(response.body);
    const id = parsedBody[0].id;

    response = await getPokemonDetailsHandler(pokemonService, { pathParameters: { id } });

    console.log("[getPokemonDetailsHandler] HTTP response:");
    console.log(response);

    response = await updatePokemonHandler(pokemonService, {
        pathParameters: {
            id,
        },
        body: JSON.stringify(pokemonUpdateFixture),
    });

    console.log("[updatePokemonHandler] HTTP response:");
    console.log(response);

    response = await deletePokemonHandler(pokemonService, { pathParameters: { id } });

    console.log("[deletePokemonHandler] HTTP response:");
    console.log(response);

    response = await getPokemonListHandler(pokemonService);

    console.log("[getPokemonListHandler] HTTP response:");
    console.log(response);

    // console.log("Fake DB content:");
    // console.dir(getFakeDb(), { depth: null });

    console.log(" -----------------");
    console.log(" --- User part ---");
    console.log(" -----------------");
    response = await createUserHandler(userService, { body: JSON.stringify(userCreateFixture[0]) });

    console.log("[createUserHandler[0]] HTTP response:");
    console.log(response);

    await createUserHandler(userService, { body: JSON.stringify(userCreateFixture[1]) });
    await createUserHandler(userService, { body: JSON.stringify(userCreateFixture[2]) });

//     console.log("Fake DB content:");
//     console.dir(getFakeUserDb(), { depth: null });

    const body = JSON.parse(response.body);

    response = await getUserDetailsHandler(
        userService,
        {
            pathParameters: {
                id: body.id,
            },
        }
    );

    console.log("[getUserDetailsHandler] HTTP response:");
    console.log(response);
}

main();
