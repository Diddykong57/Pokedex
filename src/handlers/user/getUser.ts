import type { ApiRequest, ApiResponse } from "../../global/types/api";
import { handleRequest } from "../utils/handleRequest";
import { badRequestError } from "../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../global/constants/errorMessages";
import { UserService } from "../../services/userService";
import { toUserResponseDto } from "../../mappers/userMapper";

export const getUserDetailsHandler = async (service: UserService, event: ApiRequest): Promise<ApiResponse> => {
    return handleRequest(async () => {
        const id = event.pathParameters?.id;
        if (!id) {
            throw badRequestError(ERROR_MESSAGES.MISSING_ID);
        }
        const user = await service.getUserDetails(id);
        return toUserResponseDto(user);
    });
};
