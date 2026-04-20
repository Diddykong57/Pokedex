import { isHttpError } from "http-errors";
import type { ApiResponse } from "../global/types/api";
import { HTTP } from "../global/constants/httpStatus";
import { ERROR_MESSAGES } from "../global/constants/errorMessages";

export function toApiErrorResponse(error: unknown): ApiResponse {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Content-Type": "application/json"
    }
    if (isHttpError(error)) {
        // Get error.details.details if present, otherwise undefined
        const details = (error.details as { details?: string[] } | undefined)?.details;

        if (details) {
            return {
                statusCode: error.statusCode,
                headers: corsHeaders,
                body: JSON.stringify({
                    message: error.message,
                    details: details,
                }),
            };
        }

        return {
            statusCode: error.statusCode,
            headers: corsHeaders,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }

    return {
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        headers: corsHeaders,
        body: JSON.stringify({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        }),
    };
}
