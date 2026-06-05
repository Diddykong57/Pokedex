import { User } from "../models/user";

export interface UserRepository {
    create(user: User): Promise<void>;
    getUserDetails(id: string): Promise<User>;
}
