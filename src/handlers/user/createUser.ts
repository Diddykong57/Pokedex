import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { validateSchema } from "../../validators/schemaValidator";
import { createUserSchema } from "../../validators/userSchema";
import { UserService } from "../../services/userService";
import { toUserResponseDto } from "../../mappers/userMapper";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserResponseDto } from "../../dto/user/userResponse.dto";

export const createUserHandler = async (service: UserService, event: APIGatewayProxyEvent): Promise<UserResponseDto> => {
    if (!event.body) {
        throw badRequestError(ERROR_MESSAGES.MISSING_BODY);
    }

    const payload = JSON.parse(event.body);
    const validatedPayload = validateSchema(createUserSchema, payload);

    const user = await service.createUser(validatedPayload);
    return toUserResponseDto(user);
};