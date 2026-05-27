import type { APIGatewayProxyEvent } from "aws-lambda";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { UserRepository } from "../../repositories/userRepository";
import { LocalUserRepository } from "../../repositories/impl/local/localUserRepository";
import { UserService } from "../../services/userService";
import { UserServiceImpl } from "../../services/impl/userServiceImpl";
import { createUserHandler } from "./createUser";
import { getAuthContext } from "../utils/authMiddleware";
import { getUserDetailsHandler } from "./getUser";
import { assertAdmin } from "../../utils/authorization";
import { handleRequest } from "../utils/handleRequest";
import { HTTP } from "../../global/constants/httpStatus";
import { ApiResponse } from "../../global/types/api";
import { badRequestError } from "../../utils/errorUtils";
import { DynamoUserRepository } from "../../repositories/impl/dynamoDB/dynamoUserRepository";
import { IdentityRepository } from "../../repositories/identityRepository";
import { LocalIdentityRepository } from "../../repositories/impl/local/localIdentityRepository";
import { CognitoIdentityRepository } from "../../repositories/impl/cognito/cognitoIdentityRepository";

const userRepository: UserRepository =
    process.env.APP_ENV === "aws" ? new DynamoUserRepository() : new LocalUserRepository();
const identityRepository: IdentityRepository =
    process.env.APP_ENV === "aws" ? new CognitoIdentityRepository() : new LocalIdentityRepository();
const service: UserService = new UserServiceImpl(userRepository, identityRepository);

export const userMainHandler = async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
    switch (event.httpMethod) {
        case "POST":
            return handleRequest(async () => {
                const auth = getAuthContext(event);
                assertAdmin(auth);
                return createUserHandler(service, event);
            }, HTTP.CREATED);

        case "GET":
            return handleRequest(async () => {
                const auth = getAuthContext(event);
                return getUserDetailsHandler(service, auth.userId);
            });

        default:
            return handleRequest(async () => {
                throw badRequestError(ERROR_MESSAGES.INVALID_METHOD);
            });
    }
};
