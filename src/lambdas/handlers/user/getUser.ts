import { UserService } from "../../services/userService";
import { toUserResponseDto } from "../../mappers/userMapper";
import { UserResponseDto } from "../../dto/user/userResponse.dto";

export const getUserDetailsHandler = async (service: UserService, userId: string): Promise<UserResponseDto> => {
    const user = await service.getUserDetails(userId);
    return toUserResponseDto(user);
};
