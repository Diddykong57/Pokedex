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
            body: JSON.stringify(result),
        };
    } catch (error: unknown) {
        return toApiErrorResponse(error);
    }
}
