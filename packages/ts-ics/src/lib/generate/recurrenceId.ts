import type { IcsRecurrenceId, IcsTimezone } from "@/types";

import { generateIcsTimeStamp } from "./timeStamp";

type GenerateIcsExceptionDateOptions = {
  timezones?: IcsTimezone[];
};

export const generateIcsRecurrenceId = (
  value: IcsRecurrenceId,
  options?: GenerateIcsExceptionDateOptions
) => {
  let icsString = "";

  icsString += generateIcsTimeStamp(
    "RECURRENCE-ID",
    value.value,
    value.range
      ? [
          {
            key: "RANGE",
            value: value.range,
          },
        ]
      : undefined,
    options
  );

  return icsString;
};
