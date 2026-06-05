import { AuthContext } from "../global/types/auth";
import { forbiddenError } from "./errorUtils";
import { ERROR_MESSAGES } from "../global/constants/errorMessages";

export const assertAdmin = (auth: AuthContext): void => {
    if (!auth.groups.includes("admin")) {
        throw forbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }
};
