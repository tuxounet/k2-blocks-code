import runtime, { types } from "@tuxounet-k2/runtime";

export async function main(): Promise<types.api.IApiResult> {
  runtime.log.info("greeting", "hello", "world");

  return runtime.results.successApiResult("OK", { hello: "world" });
}