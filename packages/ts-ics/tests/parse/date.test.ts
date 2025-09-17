import { generateIcsUtcDateTime } from "@/lib";
import { convertIcsDate, convertIcsDateTime } from "@/lib/parse/values/date";
import { setMilliseconds } from "date-fns";

it("Test Ics Date Time Parse", async () => {
  const value = "20230118T073000Z";

  expect(() => convertIcsDateTime(undefined, { value })).not.toThrow();
});

it("Test Ics Date Parse", async () => {
  const value = "20230118";

  expect(() => convertIcsDate(undefined, { value })).not.toThrow();
});

it("Strip Milliseconds - Milliseconds are not allowed in Ics", async () => {
  const date = new Date("2023-01-18T07:30:00.123Z");

  const icsDate = generateIcsUtcDateTime(date);

  expect(convertIcsDateTime(undefined, { value: icsDate })).toEqual(
    setMilliseconds(date, 0)
  );
});
