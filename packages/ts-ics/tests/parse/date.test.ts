import { generateIcsDateTime } from "@/lib";
import { icsDateToDate, icsDateTimeToDateTime } from "@/lib/parse/date";
import { setMilliseconds } from "date-fns";

it("Test Ics Date Time Parse", async () => {
  const value = "20230118T073000Z";

  expect(() => icsDateTimeToDateTime({ value }, undefined)).not.toThrow();
});

it("Test Ics Date Parse", async () => {
  const value = "20230118";

  expect(() => icsDateToDate({ value }, undefined)).not.toThrow();
});

it("Strip Milliseconds - Milliseconds are not allowed in Ics", async () => {
  const date = new Date("2023-01-18T07:30:00.123Z");

  const icsDate = generateIcsDateTime(date);

  expect(icsDateTimeToDateTime({ value: icsDate }, undefined)).toEqual(
    setMilliseconds(date, 0)
  );
});
