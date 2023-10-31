import set from "lodash/set";

import {
  getTimezoneDaylightRegex,
  getTimezoneStandardRegex,
  replaceTimezoneRegex,
} from "@/constants";
import {
  VTIMEZONE_TO_OBJECT_KEYS,
  VTimezoneKey,
} from "@/constants/keys/timezone";
import { VTimezone, type VTimezoneProp, zVTimezone } from "@/types/timezone";

import { icsDateTimeToDateTime } from "./date";
import { icsTimezonePropToObject } from "./timezoneProp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";

export const icsTimezoneToObject = (rawTimezoneString: string): VTimezone => {
  const timezoneString = rawTimezoneString.replace(replaceTimezoneRegex, "");

  const lines = splitLines(
    timezoneString
      .replace(getTimezoneStandardRegex, "")
      .replace(getTimezoneDaylightRegex, ""),
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
        icsTimezonePropToObject(timezonePropString, "STANDARD"),
      );
    });
  }

  const timezoneDaylightPropStrings = [
    ...timezoneString.matchAll(getTimezoneDaylightRegex),
  ].map((match) => match[0]);

  if (timezoneDaylightPropStrings.length > 0) {
    timezoneDaylightPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        icsTimezonePropToObject(timezonePropString, "DAYLIGHT"),
      );
    });
  }

  return timezone as VTimezone;
};

export const parseIcsTimezone = (timezoneString: string): VTimezone =>
  zVTimezone.parse(icsTimezoneToObject(timezoneString));
