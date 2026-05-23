import { UserService } from "../userService";
import { UserRepository } from "../../repositories/userRepository";
import { generateId } from "../../utils/idUtils";
import { getCurrentDate } from "../../utils/dateUtils";
import { CreateUserRequestDto } from "../../dto/user/createUserRequest.dto";
import { UserResponseDto } from "../../dto/user/userResponse.dto";
import { conflictError } from "../../utils/errorUtils";

export class UserServiceImpl implements UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(data: CreateUserRequestDto): Promise<UserResponseDto> {
        const existingUser = await this.userRepository.getUserDetailsByNickName(data.nickname);

        if (existingUser){
            throw conflictError();
        }

        const id = generateId();
        const now = getCurrentDate();

        const user = {
            id: id,
            email: data.email,
            nickname: data.nickname,
            createdAt: now,
        }

        await this.userRepository.create(user);
        return user;
    }
}