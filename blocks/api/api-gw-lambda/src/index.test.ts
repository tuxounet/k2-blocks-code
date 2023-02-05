import { main } from "./index";

describe("index", () => {
  test("first test", async () => {
    const result = await main(
      {
        httpMethod: "GET",
        body: "",
        headers: {},
        multiValueHeaders: {},
        path: "/",
        pathParameters: {},
        isBase64Encoded: false,
        resource: "/",
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        stageVariables: null,
        requestContext: {
          path: "",
          apiId: "",
          httpMethod: "GET",
          stage: "test",
          resourcePath: "/",
          accountId: "",
          protocol: "http",
          requestId: "",
          resourceId: "",
          requestTimeEpoch: 10,
          authorizer: null,
          identity: {
            accessKey: "",
            apiKey: "",
            accountId: "",
            apiKeyId: "",
            caller: null,
            clientCert: null,
            cognitoAuthenticationProvider: null,
            cognitoAuthenticationType: null,
            cognitoIdentityId: null,
            cognitoIdentityPoolId: null,
            principalOrgId: null,
            sourceIp: "",
            user: "",
            userAgent: null,
            userArn: "",
          },
        },
      },
      {
        awsRequestId: "",
        functionName: "",
        callbackWaitsForEmptyEventLoop: false,
        functionVersion: "",
        invokedFunctionArn: "",
        logGroupName: "",
        memoryLimitInMB: "",
        logStreamName: "",
        getRemainingTimeInMillis: () => {
          return 12;
        },
        done: (e, r) => {
          return;
        },
        fail: (e) => {
          return;
        },
        succeed: (e) => {
          return;
        },
        clientContext: undefined,
        identity: undefined,
      }
    );
    expect(result).toHaveProperty("status", 200);
  });
});
