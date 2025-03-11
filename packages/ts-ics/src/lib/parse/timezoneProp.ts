import {
  replaceTimezoneDaylightRegex,
  replaceTimezoneStandardRegex,
} from "@/constants";
import {
  VTIMEZONE_PROP_TO_OBJECT_KEYS,
  type VTimezonePropKey,
} from "@/constants/keys/timezoneProp";
import { type VTimezoneProp, type VTimezonePropType } from "@/types/timezone";

import { icsDateTimeToDateTime } from "./date";
import { icsRecurrenceRuleToObject } from "./recurrenceRule";
import { icsTimeStampToObject } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export type ParseTimezonePropOptions = { type?: VTimezonePropType };

export const icsTimezonePropToObject = (
  rawTimezonePropString: string,
  schema?: StandardSchemaV1<VTimezoneProp>,
  timezonePropOptions?: ParseTimezonePropOptions
): VTimezoneProp => {
  const timezonePropString = rawTimezonePropString
    .replace(replaceTimezoneStandardRegex, "")
    .replace(replaceTimezoneDaylightRegex, "");

  const lines = splitLines(timezonePropString);

  const timezoneProp: Partial<VTimezoneProp> = {
    type: timezonePropOptions?.type || "STANDARD",
  };

  lines.forEach((line) => {
    const { property, options, value } = getLine<VTimezonePropKey>(line);

    const objectKey = VTIMEZONE_PROP_TO_OBJECT_KEYS[property];

    if (!objectKey) return;

    if (objectKey === "start") {
      timezoneProp[objectKey] = icsDateTimeToDateTime(value);

      return;
    }

    if (objectKey === "recurrenceRule") {
      timezoneProp[objectKey] = icsRecurrenceRuleToObject(value);

      return;
    }

    if (objectKey === "recurrenceDate") {
      timezoneProp[objectKey] = icsTimeStampToObject(value, options);

      return;
    }

    timezoneProp[objectKey] = value;
  });

  return standardValidate(schema, timezoneProp as VTimezoneProp);
};
