import {
  replaceTimezoneDaylightRegex,
  replaceTimezoneStandardRegex,
} from "@/constants";
import {
  VTIMEZONE_PROP_TO_OBJECT_KEYS,
  type IcsTimezonePropKey,
} from "@/constants/keys/timezoneProp";
import type {
  ConvertTimezoneProp,
  IcsTimezoneProp,
} from "@/types/timezoneProp";

import { convertIcsDateTime } from "../values/date";
import { convertIcsRecurrenceRule } from "../values/recurrenceRule";
import { convertIcsTimeStamp } from "../values/timeStamp";
import { getLine } from "../utils/line";
import { splitLines } from "../utils/splitLines";
import { standardValidate } from "../utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "../nonStandard/nonStandardValues";
import type { Line } from "@/types";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsTimezoneProp = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertTimezoneProp<T>>
): ReturnType<ConvertTimezoneProp<T>> => {
  const [schema, rawTimezonePropString, options] = args;

  const timezonePropString = rawTimezonePropString
    .replace(replaceTimezoneStandardRegex, "")
    .replace(replaceTimezoneDaylightRegex, "");

  const lineStrings = splitLines(timezonePropString);

  const timezoneProp: Partial<IcsTimezoneProp> = {
    type: options?.type || "STANDARD",
  };

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsTimezonePropKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VTIMEZONE_PROP_TO_OBJECT_KEYS[property];

    if (!objectKey) return;

    if (objectKey === "start") {
      timezoneProp[objectKey] = convertIcsDateTime(undefined, line);

      return;
    }

    if (objectKey === "recurrenceRule") {
      timezoneProp[objectKey] = convertIcsRecurrenceRule(undefined, line, {
        timezones: options?.timezones,
      });

      return;
    }

    if (objectKey === "recurrenceDate") {
      timezoneProp[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: options?.timezones,
      });

      return;
    }

    timezoneProp[objectKey] = line.value;
  });

  const validatedTimezoneProp = standardValidate(
    schema,
    timezoneProp as IcsTimezoneProp<T>
  );

  if (!options?.nonStandard) return validatedTimezoneProp;

  return convertNonStandardValues(
    validatedTimezoneProp,
    nonStandardValues,
    options?.nonStandard
  );
};
