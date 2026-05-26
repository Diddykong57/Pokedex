import type { APIGatewayProxyEvent } from "aws-lambda";

export const buildApiEvent = (
    overrides: Partial<APIGatewayProxyEvent> = {}
): APIGatewayProxyEvent =>
    ({
        body: null,
        headers: {},
        multiValueHeaders: {},
        httpMethod: "GET",
        isBase64Encoded: false,
        path: "/",
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        resource: "",
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: {
                claims: {
                    sub: "user-001",
                    email: "sacha@example.com",
                    "cognito:groups": "admin",
                },
            },
            protocol: "HTTP/1.1",
            httpMethod: "GET",
            identity: {} as APIGatewayProxyEvent["requestContext"]["identity"],
            path: "/",
            stage: "local",
            requestId: "local",
            requestTimeEpoch: Date.now(),
            resourceId: "",
            resourcePath: "",
        },
        ...overrides,
    }) as APIGatewayProxyEvent;