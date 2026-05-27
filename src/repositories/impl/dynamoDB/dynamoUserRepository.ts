import { User } from "../../../models/user";
import { UserRepository } from "../../userRepository";
import { PutCommand, DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { toUserDetails, toUserItems } from "../../../mappers/userMapper";
import { USER_ITEM } from "../../../global/constants/user";
import { notFoundError } from "../../../utils/errorUtils";
import { ERROR_MESSAGES } from "../../../global/constants/errorMessages";
import { UserProfileItem } from "../../types/userItem";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoUserRepository implements UserRepository{
    private readonly tableName = process.env.TABLE_NAME!;

    async create(user: User): Promise<void> {
        await this.saveUser(user);
    }

    async getUserDetails(id: string): Promise<User> {
        const pk = this.buildPk(id);
        const sk = USER_ITEM.PROFILE.SK;
        const response = await docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    PK: pk,
                    SK: sk,
                },
            })
        );

        if (!response.Item) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return toUserDetails(response.Item as UserProfileItem);

    }

    private async saveUser(user: User) {
        const userProfileItem = toUserItems(user)
        await docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: userProfileItem,
            })
        );
    }
    private buildPk(userId: string): string {
        return `${USER_ITEM.PK_PREFIX}#${userId}`;
    }

}