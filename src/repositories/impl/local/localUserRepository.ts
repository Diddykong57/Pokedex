import { UserRepository } from "../../userRepository";
import { User } from "../../../models/user";
import { UserProfileItem } from "../../types/userItem";
import { toUserDetails, toUserItems } from "../../../mappers/userMapper";
import { USER_ITEM } from "../../../global/constants/user";
import { notFoundError } from "../../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../../global/constants/errorMessages";

const fakeUserDb: UserProfileItem[] = [];

export class LocalUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        const userItem = toUserItems(user);

        fakeUserDb.push(userItem);
    }

    async getUserDetails(id: string): Promise<User> {
        const pk = `${USER_ITEM.PK_PREFIX}#${id}`;

        const profile = await this.getProfile(pk);

        return toUserDetails(profile);
    }

    private async getProfile(pk: string): Promise<UserProfileItem> {
        const profile = fakeUserDb.find(
            (item): item is UserProfileItem => item.PK === pk && item.SK === USER_ITEM.PROFILE.SK
        );

        if (!profile) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return profile;
    }
}

export function getFakeUserDb() {
    return fakeUserDb;
}
