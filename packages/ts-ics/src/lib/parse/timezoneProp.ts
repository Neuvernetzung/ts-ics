import {
  replaceTimezoneDaylightRegex,
  replaceTimezoneStandardRegex,
} from "@/constants";
import {
  VTIMEZONE_PROP_TO_OBJECT_KEYS,
  type VTimezonePropKey,
} from "@/constants/keys/timezoneProp";
import {
  TimezonePropLinesToObject,
  type VTimezoneProp,
} from "@/types/timezone";

import { icsDateTimeToDateTime } from "./date";
import { icsRecurrenceRuleToObject } from "./recurrenceRule";
import { icsTimeStampToObject } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";

export const icsTimezonePropToObject: TimezonePropLinesToObject = (
  rawTimezonePropString,
  schema,
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
      timezoneProp[objectKey] = icsDateTimeToDateTime(line, undefined);

      return;
    }

    if (objectKey === "recurrenceRule") {
      timezoneProp[objectKey] = icsRecurrenceRuleToObject(line, undefined, {
        timezones: timezonePropOptions.timezones,
      });

      return;
    }

    if (objectKey === "recurrenceDate") {
      timezoneProp[objectKey] = icsTimeStampToObject(line, undefined, {
        timezones: timezonePropOptions.timezones,
      });

      return;
    }

    timezoneProp[objectKey] = line.value;
  });

  return standardValidate(schema, timezoneProp as VTimezoneProp);
};
