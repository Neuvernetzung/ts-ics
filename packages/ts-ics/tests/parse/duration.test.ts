import { convertIcsDuration } from "@/lib/parse/duration";

it("Test Ics Duration Parse", async () => {
  const value = "P15DT5H0M20S";

  expect(() => convertIcsDuration(undefined, { value })).not.toThrow();
});

it("Test Ics Duration Parse", async () => {
  const value = "P7W";

  expect(() => convertIcsDuration(undefined, { value })).not.toThrow();
});
