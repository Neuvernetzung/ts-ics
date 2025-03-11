import {
  getTimezoneDaylightRegex,
  getTimezoneStandardRegex,
  replaceTimezoneRegex,
} from "@/constants";
import {
  VTIMEZONE_TO_OBJECT_KEYS,
  type VTimezoneKey,
} from "@/constants/keys/timezone";
import { type VTimezone } from "@/types/timezone";

import { icsDateTimeToDateTime } from "./date";
import { icsTimezonePropToObject } from "./timezoneProp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsTimezoneToObject = (
  rawTimezoneString: string,
  schema?: StandardSchemaV1<VTimezone>
): VTimezone => {
  const timezoneString = rawTimezoneString.replace(replaceTimezoneRegex, "");

  const lines = splitLines(
    timezoneString
      .replace(getTimezoneStandardRegex, "")
      .replace(getTimezoneDaylightRegex, "")
  );

  const timezone: Partial<VTimezone> & Required<Pick<VTimezone, "props">> = {
    props: [],
  };

  lines.forEach((line) => {
    const { property, value } = getLine<VTimezoneKey>(line);

    const objectKey = VTIMEZONE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "lastModified") {
      timezone[objectKey] = icsDateTimeToDateTime(value);

      return;
    }

    timezone[objectKey] = value; // Set string value
  });

  const timezoneStandardPropStrings = [
    ...timezoneString.matchAll(getTimezoneStandardRegex),
  ].map((match) => match[0]);

  if (timezoneStandardPropStrings.length > 0) {
    timezoneStandardPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        icsTimezonePropToObject(timezonePropString, undefined, {
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
        icsTimezonePropToObject(timezonePropString, undefined, {
          type: "DAYLIGHT",
        })
      );
    });
  }

  return standardValidate(schema, timezone as VTimezone);
};
