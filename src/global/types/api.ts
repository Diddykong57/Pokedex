export interface ApiRequest {
    body?: string | null;
    pathParameters?: {
        id?: string;
    } | null;
}

export interface ApiResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body: string;
}
