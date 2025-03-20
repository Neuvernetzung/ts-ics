import type { IcsRecurrenceId } from "@/types";

import { generateIcsTimeStamp } from "./timeStamp";

export const generateIcsRecurrenceId = (value: IcsRecurrenceId) => {
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
      : undefined
  );

  return icsString;
};
