import runtime, { types } from "@tuxounet-k2/runtime";
const handler: types.api.IApiHandler = async (
  request: types.api.IApiRequest
): Promise<types.api.IApiResult> => {
  return runtime.results.successApiResult("OK", { heathy: "OK" });
};

export default handler;
