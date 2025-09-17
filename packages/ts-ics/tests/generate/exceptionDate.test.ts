import { generateIcsExceptionDate } from "@/lib/generate/values/exceptionDate";
import { convertIcsExceptionDates } from "@/lib/parse/values/exceptionDate";
import { getLine } from "@/lib/parse/utils/line";
import { splitLines } from "@/lib/parse/utils/splitLines";
import type { IcsExceptionDates } from "@/types/values/exceptionDate";

it("Test Ics Exception Date Generate", async () => {
  const exceptions: IcsExceptionDates = [
    { date: new Date("2007-04-02T01:00:00.000Z"), type: "DATE-TIME" },
    { date: new Date("2007-04-03T01:00:00.000Z"), type: "DATE-TIME" },
  ];

  let exceptionsString = "";

  exceptions.forEach((exception) => {
    exceptionsString += generateIcsExceptionDate(exception, "EXDATE");
  });

  const lineStrings = splitLines(exceptionsString);

  lineStrings.forEach((lineString, i) => {
    const { line } = getLine(lineString);

    const parsed = convertIcsExceptionDates(undefined, line);

    expect(parsed[0].date).toEqual(exceptions[i].date);
  });
});
