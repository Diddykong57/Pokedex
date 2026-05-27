import type { APIGatewayProxyEvent } from "aws-lambda";

type ApiEventOverrides = Omit<Partial<APIGatewayProxyEvent>, "requestContext"> & {
    requestContext?: Partial<APIGatewayProxyEvent["requestContext"]> & {
        authorizer?: {
            claims?: Record<string, string>;
        };
    };
};

export const buildApiEvent = (overrides: ApiEventOverrides = {}): APIGatewayProxyEvent => {
    const baseEvent: APIGatewayProxyEvent = {
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
    };

    return {
        ...baseEvent,
        ...overrides,
        requestContext: {
            ...baseEvent.requestContext,
            ...overrides.requestContext,
            authorizer: {
                ...baseEvent.requestContext.authorizer,
                ...overrides.requestContext?.authorizer,
                claims: {
                    ...baseEvent.requestContext.authorizer?.claims,
                    ...overrides.requestContext?.authorizer?.claims,
                },
            },
        },
    } as APIGatewayProxyEvent;
};