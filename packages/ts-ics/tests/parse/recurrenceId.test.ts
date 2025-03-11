import { getLine } from "@/lib/parse/utils/line";

import { icsRecurrenceIdToObject } from "@/lib/parse/recurrenceId";

it("Test Ics Recurrence Id Parse", async () => {
  const rId = `RECURRENCE-ID;VALUE=DATE:19960401`;

  const { value, options } = getLine(rId);

  expect(() => icsRecurrenceIdToObject(value, options)).not.toThrow();
});

it("Test Ics Recurrence Id Parse", async () => {
  const rId = `RECURRENCE-ID;RANGE=THISANDFUTURE:19960120T120000Z`;

  const { value, options } = getLine(rId);

  expect(() => icsRecurrenceIdToObject(value, options)).not.toThrow();
});
