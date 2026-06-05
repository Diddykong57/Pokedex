import { User } from "../models/user";
import { UserProfileItem } from "../repositories/types/userItem";
import { USER_ITEM } from "../global/constants/user";
import { UserResponseDto } from "../dto/user/userResponse.dto";

export const toUserItems = (user: User): UserProfileItem => {
    const pk = `${USER_ITEM.PK_PREFIX}#${user.id}`;

    return {
        PK: pk,
        SK: USER_ITEM.PROFILE.SK,
        entityType: USER_ITEM.PROFILE.ENTITY_TYPE,
        userId: user.id,
        email: user.email,
        nickname: user.nickname,
        createdAt: user.createdAt,
    };
};

export const toUserFromProfileItem = (item: UserProfileItem): User => ({
    id: item.userId,
    email: item.email,
    nickname: item.nickname,
    createdAt: item.createdAt,
});

export const toUserResponseDto = (user: User): UserResponseDto => ({
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    createdAt: user.createdAt,
});

export const toUserDetails = (profile: UserProfileItem): User => ({
    id: profile.userId,
    email: profile.email,
    nickname: profile.nickname,
    createdAt: profile.createdAt,
});
