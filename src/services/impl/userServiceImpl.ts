import { UserService } from "../userService";
import { UserRepository } from "../../repositories/userRepository";
import { getCurrentDate } from "../../utils/dateUtils";
import { CreateUserRequestDto } from "../../dto/user/createUserRequest.dto";
import { User } from "../../models/user";
import { IdentityRepository } from "../../repositories/identityRepository";

export class UserServiceImpl implements UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly identityRepository: IdentityRepository
    ) {}

    async createUser(data: CreateUserRequestDto): Promise<User> {
        const userId = await this.identityRepository.createUser(data.email);
        const now = getCurrentDate();

        const user: User = {
            id: userId,
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