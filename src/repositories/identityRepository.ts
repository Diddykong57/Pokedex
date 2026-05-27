export interface IdentityRepository {
    createUser(email: string): Promise<string>;
    addUserToGroup(email: string, groupName: string): Promise<void>;
}