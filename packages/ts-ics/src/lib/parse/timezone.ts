import {
  getTimezoneDaylightRegex,
  getTimezoneStandardRegex,
  replaceTimezoneRegex,
} from "@/constants";
import {
  VTIMEZONE_TO_OBJECT_KEYS,
  type IcsTimezoneKey,
} from "@/constants/keys/timezone";
import type { ConvertTimezone, IcsTimezone } from "@/types/timezone";

import { convertIcsDateTime } from "./date";
import { convertIcsTimezoneProp } from "./timezoneProp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";
import { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./utils/nonStandardValues";
import { Line } from "@/types";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsTimezone = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertTimezone<T>>
): ReturnType<ConvertTimezone<T>> => {
  const [schema, rawTimezoneString, options] = args;

  const timezoneString = rawTimezoneString.replace(replaceTimezoneRegex, "");

  const lineStrings = splitLines(
    timezoneString
      .replace(getTimezoneStandardRegex, "")
      .replace(getTimezoneDaylightRegex, "")
  );

  const nonStandardValues: Record<string, Line> = {};

  const timezone: Partial<IcsTimezone> & Required<Pick<IcsTimezone, "props">> =
    {
      props: [],
    };

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsTimezoneKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
      return;
    }

    const objectKey = VTIMEZONE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "lastModified") {
      timezone[objectKey] = convertIcsDateTime(undefined, line);

      return;
    }

    timezone[objectKey] = line.value; // Set string value
  });

  const timezoneStandardPropStrings = [
    ...timezoneString.matchAll(getTimezoneStandardRegex),
  ].map((match) => match[0]);

  if (timezoneStandardPropStrings.length > 0) {
    timezoneStandardPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        convertIcsTimezoneProp(undefined, timezonePropString, {
          type: "STANDARD",
        })
      );
    });
  }

  const timezoneDaylightPropStrings = [
    ...timezoneString.matchAll(getTimezoneDaylightRegex),
  ].map((match) => match[0]);

  if (timezoneDaylightPropStrings.length > 0) {
    timezoneDaylightPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        convertIcsTimezoneProp(undefined, timezonePropString, {
          type: "DAYLIGHT",
        })
      );
    });
  }

  const validatedTimezone = standardValidate(
    schema,
    timezone as IcsTimezone<T>
  );

  if (!options?.nonStandard) return validatedTimezone;

  return convertNonStandardValues(
    validatedTimezone,
    nonStandardValues,
    options?.nonStandard
  );
};
