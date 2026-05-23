import { UserRepository } from "../../userRepository";
import { User } from "../../../models/user";
import { UserItem, UserProfileItem } from "../../types/userItem";
import { toUserFromProfileItem, toUserItems } from "../../../mappers/userMapper";
import { USER_ITEM } from "../../../global/constants/user";

const fakeUserDb: UserItem[] = [];

export class LocalUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        const userItem = toUserItems(user);

        fakeUserDb.push(userItem);
    }

    async getUserDetailsByNickName(nickame: string): Promise<User | null> {
        const user = fakeUserDb.find(
            (item): item is UserProfileItem =>
                item.SK === USER_ITEM.PROFILE.SK &&
                item.nickname === nickame
        );

        if (!user) {
            return null;
        }

        return toUserFromProfileItem(user);
    }
}

export function getFakeUserDb() {
    return fakeUserDb;
}
