import { main } from "./index";

describe("index", () => {
  test("first test", async () => {
    const result = await main();
    expect(result).toHaveProperty("status", 200);
  });
});
