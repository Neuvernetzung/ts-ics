import { generateIcsDuration } from "@/lib";
import type { IcsDuration } from "@/types";

it("Duration is generated correctly", () => {
  const duration: IcsDuration = {
    weeks: 1,
    days: 15,
    hours: 5,
    minutes: 10,
    seconds: 20,
  };

  const durationString = generateIcsDuration(duration);

  expect(durationString).toContain("P1W15DT5H10M20S");
});

it("Handles 0 values correctly - #194", () => {
  const duration: IcsDuration = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const durationString = generateIcsDuration(duration);

  expect(durationString).toContain("PT0H0M0S");
});

describe("Handles empty object correctly - gh#194", () => {
  it("Empty object", () => {
    const duration: IcsDuration = {};

    const durationString = generateIcsDuration(duration);

    expect(durationString).toBe(undefined);
  });

  it("Only undefined values in object", () => {
    const duration: IcsDuration = { minutes: undefined, seconds: undefined };

    const durationString = generateIcsDuration(duration);

    expect(durationString).toBe(undefined);
  });

  it("Only undefined values in object but true before value", () => {
    const duration: IcsDuration = { before: true, minutes: undefined };

    const durationString = generateIcsDuration(duration);

    expect(durationString).toBe(undefined);
  });
});
