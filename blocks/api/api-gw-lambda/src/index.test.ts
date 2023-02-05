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
        },
      },
      {}
    );
    expect(result).toHaveProperty("status", 200);
  });
});
