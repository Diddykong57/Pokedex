import {
    AdminAddUserToGroupCommand,
    AdminCreateUserCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import type { IdentityRepository } from "../../identityRepository";

const cognitoClient = new CognitoIdentityProviderClient({});

export class CognitoIdentityRepository implements IdentityRepository {
    private readonly userPoolId = process.env.USER_POOL_ID!;

    async createUser(email: string): Promise<string> {
        const response = await cognitoClient.send(
            new AdminCreateUserCommand({
                UserPoolId: this.userPoolId,
                Username: email,
                UserAttributes: [
                    { Name: "email", Value: email },
                    { Name: "email_verified", Value: "true" },
                ],
            })
        );

        const sub = response.User?.Attributes?.find(attribute => attribute.Name === "sub")?.Value;

        if (!sub) {
            throw new Error("Cognito user sub not found");
        }

        return sub;
    }

    async addUserToGroup(email: string, groupName: string): Promise<void> {
        await cognitoClient.send(
            new AdminAddUserToGroupCommand({
                UserPoolId: this.userPoolId,
                Username: email,
                GroupName: groupName,
            })
        );
    }
}