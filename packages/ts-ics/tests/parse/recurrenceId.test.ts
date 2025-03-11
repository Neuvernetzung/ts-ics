import { getLine } from "@/lib/parse/utils/line";

import { icsRecurrenceIdToObject } from "@/lib/parse/recurrenceId";

it("Test Ics Recurrence Id Parse", async () => {
  const rId = `RECURRENCE-ID;VALUE=DATE:19960401`;

  const { line } = getLine(rId);

  expect(() => icsRecurrenceIdToObject(line, undefined)).not.toThrow();
});

it("Test Ics Recurrence Id Parse", async () => {
  const rId = `RECURRENCE-ID;RANGE=THISANDFUTURE:19960120T120000Z`;

  const { line } = getLine(rId);

  expect(() => icsRecurrenceIdToObject(line, undefined)).not.toThrow();
});
