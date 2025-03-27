import { getEventEndFromDuration } from "./eventEndFromDuration";

describe("getEventEndFromDuration", () => {
  // Consistent start date for testing
  const baseStartDate = new Date("2025-01-27T12:00:00Z");

  describe("forward duration (before: false)", () => {
    it("should add seconds correctly", () => {
      const duration = { seconds: 30, before: false };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T12:00:30.000Z");
    });

    it("should add minutes correctly", () => {
      const duration = { minutes: 45, before: false };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T12:45:00.000Z");
    });

    it("should add hours correctly", () => {
      const duration = { hours: 3, before: false };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T15:00:00.000Z");
    });

    it("should add days correctly", () => {
      const duration = { days: 2, before: false };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-29T12:00:00.000Z");
    });

    it("should add weeks correctly", () => {
      const duration = { weeks: 1, before: false };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-02-03T12:00:00.000Z");
    });

    it("should combine multiple time units correctly", () => {
      const duration = {
        weeks: 1,
        days: 2,
        hours: 3,
        minutes: 45,
        seconds: 30,
        before: false,
      };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-02-05T15:45:30.000Z");
    });
  });

  describe("backward duration (before: true)", () => {
    it("should subtract seconds correctly", () => {
      const duration = { seconds: 30, before: true };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T11:59:30.000Z");
    });

    it("should subtract minutes correctly", () => {
      const duration = { minutes: 45, before: true };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T11:15:00.000Z");
    });

    it("should subtract hours correctly", () => {
      const duration = { hours: 3, before: true };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T09:00:00.000Z");
    });

    it("should subtract days correctly", () => {
      const duration = { days: 2, before: true };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-25T12:00:00.000Z");
    });

    it("should subtract weeks correctly", () => {
      const duration = { weeks: 1, before: true };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-20T12:00:00.000Z");
    });

    it("should combine multiple time units correctly when before is true", () => {
      const duration = {
        weeks: 1,
        days: 2,
        hours: 3,
        minutes: 45,
        seconds: 30,
        before: true,
      };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-18T08:14:30.000Z");
    });
  });

  describe("edge cases", () => {
    it("should handle zero values for all units", () => {
      const duration = {
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        before: false,
      };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T12:00:00.000Z");
    });

    it("should handle undefined values for units", () => {
      const duration = { before: false };
      const result = getEventEndFromDuration(baseStartDate, duration);

      expect(result.toISOString()).toEqual("2025-01-27T12:00:00.000Z");
    });
  });
});
