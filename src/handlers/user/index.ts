import type { APIGatewayProxyEvent } from "aws-lambda";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { UserRepository } from "../../repositories/userRepository";
import { LocalUserRepository } from "../../repositories/impl/local/localUserRepository";
import { UserService } from "../../services/userService";
import { UserServiceImpl } from "../../services/impl/userServiceImpl";
import { createUserHandler } from "./createUser";
import { getUserDetailsHandler } from "./getUser";

// const repository: UserRepository =
//     process.env.APP_ENV === "aws" ? new DynamoUserRepository() : new LocalUserRepository();
const repository: UserRepository = new LocalUserRepository();
const service: UserService = new UserServiceImpl(repository);

export const handler = async (event: APIGatewayProxyEvent) => {
    switch (event.httpMethod) {
        case "POST":
            return createUserHandler(service, event);

        case "GET":
            return getUserDetailsHandler(service, event);

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: ERROR_MESSAGES.INVALID_METHOD,
                }),
            };
    }
};
