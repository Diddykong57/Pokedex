import { User } from "../models/user";

export interface UserRepository {
    create(user: User): Promise<void>;
    getUserDetailsByNickName(nickname: string): Promise<User | null>;
    getUserDetails(id: string): Promise<User>;
}