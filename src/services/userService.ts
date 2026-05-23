import { CreateUserRequestDto } from "../dto/user/createUserRequest.dto";
import { UserResponseDto } from "../dto/user/userResponse.dto";

export interface UserService {
    createUser(data: CreateUserRequestDto): Promise<UserResponseDto>;
}
