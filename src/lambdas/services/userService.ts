import { CreateUserRequestDto } from "../dto/user/createUserRequest.dto";
import { User } from "../models/user";

export interface UserService {
    createUser(data: CreateUserRequestDto): Promise<User>;
    getUserDetails(id: string): Promise<User>;
}
