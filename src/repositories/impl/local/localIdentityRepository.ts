import { generateId } from "../../../utils/idUtils";
import { IdentityRepository } from "../../identityRepository";

export class LocalIdentityRepository implements IdentityRepository {
    async createUser(): Promise<string> {
        return generateId();
    }

    async addUserToGroup(): Promise<void> {
        return;
    }
}
