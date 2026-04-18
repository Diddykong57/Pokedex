import { isHttpError } from "http-errors";
import type { ApiResponse } from "../global/types/api";
import { HTTP } from "../global/constants/httpStatus";
import { ERROR_MESSAGES } from "../global/constants/errorMessages";

export function toApiErrorResponse(error: unknown): ApiResponse {
    if (isHttpError(error)) {
        return {
            statusCode: error.statusCode,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }

    return {
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        }),
    };
}