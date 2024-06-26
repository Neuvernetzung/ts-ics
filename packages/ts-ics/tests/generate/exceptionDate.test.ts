import { generateIcsExceptionDate } from "@/lib/generate/exceptionDate";
import { parseIcsExceptionDate } from "@/lib/parse/exceptionDate";
import { getLine } from "@/lib/parse/utils/line";
import { splitLines } from "@/lib/parse/utils/splitLines";
import type { ExceptionDates } from "@/types/exceptionDate";

it("Test Ics Exception Date Generate", async () => {
  const exceptions: ExceptionDates = [
    { date: new Date("2007-04-02T01:00:00.000Z"), type: "DATE-TIME" },
    { date: new Date("2007-04-03T01:00:00.000Z"), type: "DATE-TIME" },
  ];

  let exceptionsString = "";

  exceptions.forEach((exception) => {
    exceptionsString += generateIcsExceptionDate(exception, "EXDATE");
  });

  const lines = splitLines(exceptionsString);

  lines.forEach((line, i) => {
    const { options, value } = getLine(line);

    const parsed = parseIcsExceptionDate(value, options);

    expect(parsed[0].date).toEqual(exceptions[i].date);
  });
});
