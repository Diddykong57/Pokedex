import type { ApiResponse } from "../global/types/api";
import { handleRequest } from "./utils/handleRequest";

export const healthCheckHandler = async (): Promise<ApiResponse> => {
    return handleRequest(async () => {
        return { message: "Lambda connection - Success" };
    });
};
