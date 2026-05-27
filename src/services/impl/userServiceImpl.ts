import { UserService } from "../userService";
import { UserRepository } from "../../repositories/userRepository";
import { generateId } from "../../utils/idUtils";
import { getCurrentDate } from "../../utils/dateUtils";
import { CreateUserRequestDto } from "../../dto/user/createUserRequest.dto";
import { User } from "../../models/user";

export class UserServiceImpl implements UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(data: CreateUserRequestDto): Promise<User> {
        const id = generateId();
        const now = getCurrentDate();

        const user: User = {
            id: id,
            email: data.email,
            nickname: data.nickname,
            createdAt: now,
        };

        await this.userRepository.create(user);
        return user;
    }

    async getUserDetails(id: string): Promise<User> {
        return this.userRepository.getUserDetails(id);
    }
}