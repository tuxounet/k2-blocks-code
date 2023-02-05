import runtime, { types } from "@tuxounet-k2/runtime";
import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function main(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  return runtime.results.successApiResult("OK", { hello: "world" });
}
