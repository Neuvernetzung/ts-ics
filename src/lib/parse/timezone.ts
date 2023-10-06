import set from "lodash/set";

import {
  VTIMEZONE_KEYS,
  VTIMEZONE_TO_OBJECT_KEYS,
  VTimezoneKey,
} from "@/constants/keys/timezone";

import { icsDateTimeToDateTime } from "./date";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import {
  getTimezoneDaylightRegex,
  getTimezoneStandardRegex,
  replaceTimezoneRegex,
} from "@/constants";
import { icsTimezonePropToObject } from "./timezoneProp";
import { type VTimezoneProp, zVTimezone } from "@/types/timezone";

export const icsTimezoneToObject = (rawTimezoneString: string) => {
  const timezoneString = rawTimezoneString.replace(replaceTimezoneRegex, "");

  const lines = splitLines(
    VTIMEZONE_KEYS,
    timezoneString
      .replace(getTimezoneStandardRegex, "")
      .replace(getTimezoneDaylightRegex, "")
  );

  const timezone = { props: [] as VTimezoneProp[] };

  lines.forEach((line) => {
    const { property, value } = getLine<VTimezoneKey>(line);

    const objectKey = VTIMEZONE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "lastModified") {
      set(timezone, objectKey, icsDateTimeToDateTime(value));
      return;
    }

    set(timezone, objectKey, value); // Set string value
  });

  const timezoneStandardPropStrings = [
    ...timezoneString.matchAll(getTimezoneStandardRegex),
  ].map((match) => match[0]);

  if (timezoneStandardPropStrings.length > 0) {
    timezoneStandardPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        icsTimezonePropToObject(timezonePropString, "STANDARD")
      );
    });
  }

  const timezoneDaylightPropStrings = [
    ...timezoneString.matchAll(getTimezoneDaylightRegex),
  ].map((match) => match[0]);

  if (timezoneDaylightPropStrings.length > 0) {
    timezoneDaylightPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        icsTimezonePropToObject(timezonePropString, "DAYLIGHT")
      );
    });
  }

  return timezone;
};

export const parseIcsTimezone = (timezoneString: string) =>
  zVTimezone.parse(icsTimezoneToObject(timezoneString));
