import {
  replaceTimezoneDaylightRegex,
  replaceTimezoneStandardRegex,
} from "@/constants";
import {
  VTIMEZONE_PROP_TO_OBJECT_KEYS,
  type VTimezonePropKey,
} from "@/constants/keys/timezoneProp";
import type { ConvertTimezoneProp, VTimezoneProp } from "@/types/timezone";

import { convertIcsDateTime } from "./date";
import { convertIcsRecurrenceRule } from "./recurrenceRule";
import { convertIcsTimeStamp } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsTimezoneProp: ConvertTimezoneProp = (
  schema,
  rawTimezonePropString,
  timezonePropOptions
) => {
  const timezonePropString = rawTimezonePropString
    .replace(replaceTimezoneStandardRegex, "")
    .replace(replaceTimezoneDaylightRegex, "");

  const lineStrings = splitLines(timezonePropString);

  const timezoneProp: Partial<VTimezoneProp> = {
    type: timezonePropOptions?.type || "STANDARD",
  };

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<VTimezonePropKey>(lineString);

    const objectKey = VTIMEZONE_PROP_TO_OBJECT_KEYS[property];

    if (!objectKey) return;

    if (objectKey === "start") {
      timezoneProp[objectKey] = convertIcsDateTime(undefined, line);

      return;
    }

    if (objectKey === "recurrenceRule") {
      timezoneProp[objectKey] = convertIcsRecurrenceRule(undefined, line, {
        timezones: timezonePropOptions?.timezones,
      });

      return;
    }

    if (objectKey === "recurrenceDate") {
      timezoneProp[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: timezonePropOptions?.timezones,
      });

      return;
    }

    timezoneProp[objectKey] = line.value;
  });

  return standardValidate(schema, timezoneProp as VTimezoneProp);
};
