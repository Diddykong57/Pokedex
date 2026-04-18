export interface ApiRequest {
    body: string | null;
}

export interface ApiResponse {
    statusCode: number;
    body: string;
}
