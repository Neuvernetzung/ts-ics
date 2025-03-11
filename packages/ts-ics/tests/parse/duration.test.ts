import { icsDurationToObject } from "@/lib/parse/duration";

it("Test Ics Duration Parse", async () => {
  const duration = "P15DT5H0M20S";

  expect(() => icsDurationToObject(duration)).not.toThrow();
});

it("Test Ics Duration Parse", async () => {
  const duration = "P7W";

  expect(() => icsDurationToObject(duration)).not.toThrow();
});
