export interface ApiRequest {
    body: string | null;
    pathParameters?: {
        id?: string;
    };
}

export interface ApiResponse {
    statusCode: number;
    body: string;
}
