import { icsDurationToObject } from "@/lib/parse/duration";

it("Test Ics Duration Parse", async () => {
  const value = "P15DT5H0M20S";

  expect(() => icsDurationToObject(undefined, { value })).not.toThrow();
});

it("Test Ics Duration Parse", async () => {
  const value = "P7W";

  expect(() => icsDurationToObject(undefined, { value })).not.toThrow();
});
