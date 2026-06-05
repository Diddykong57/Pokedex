import { BaseItem } from "./baseItem";

export interface UserProfileItem extends BaseItem {
    SK: "PROFILE";
    entityType: "USER_PROFILE";
    userId: string;
    email: string;
    nickname: string;
    createdAt: string;
}
