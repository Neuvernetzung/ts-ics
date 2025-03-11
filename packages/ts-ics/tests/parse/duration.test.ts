import { icsDurationToObject } from "@/lib/parse/duration";

it("Test Ics Duration Parse", async () => {
  const value = "P15DT5H0M20S";

  expect(() => icsDurationToObject({ value }, undefined)).not.toThrow();
});

it("Test Ics Duration Parse", async () => {
  const value = "P7W";

  expect(() => icsDurationToObject({ value }, undefined)).not.toThrow();
});
