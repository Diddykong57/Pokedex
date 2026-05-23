import { handleRequest } from "../utils/handleRequest";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { validateSchema } from "../../validators/schemaValidator";
import { HTTP } from "../../global/constants/httpStatus";
import { ApiRequest, ApiResponse } from "../../global/types/api";
import { createUserSchema } from "../../validators/userSchema";
import { UserService } from "../../services/userService";
import { toUserResponseDto } from "../../mappers/userMapper";

export const createUserHandler = async (service: UserService, event: ApiRequest): Promise<ApiResponse> => {
    return handleRequest(async () => {
        if (!event.body) {
            throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
        }

        const payload = JSON.parse(event.body);
        const validatedPayload = validateSchema(createUserSchema, payload);

        const user = await service.createUser(validatedPayload);
        return toUserResponseDto(user);
    }, HTTP.CREATED);
};