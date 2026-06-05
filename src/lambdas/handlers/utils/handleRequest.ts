import { HTTP } from "../../global/constants/httpStatus";
import type { ApiResponse } from "../../global/types/api";
import { toApiErrorResponse } from "../../mappers/errorMapper";

export async function handleRequest<Result>(
    action: () => Promise<Result>,
    successStatusCode: number = HTTP.OK
): Promise<ApiResponse> {
    try {
        const result = await action();

        return {
            statusCode: successStatusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        };
    } catch (error: unknown) {
        console.error("[Details] Pokedex error:", error);
        return toApiErrorResponse(error);
    }
}
