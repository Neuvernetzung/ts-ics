import { VTIMEZONE_PROP_TO_OBJECT_KEYS } from "@/constants/keys/timezoneProp";
import {
  type IcsTimezonePropType,
  TIMEZONE_PROP_COMPONENTS,
  type ConvertTimezoneProp,
} from "@/types/timezoneProp";

import { convertIcsDateTime } from "../values/date";
import { convertIcsRecurrenceRule } from "../values/recurrenceRule";
import { convertIcsTimeStamp } from "../values/timeStamp";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { _convertIcsComponent } from "./_component";
import { BREAK_REGEX } from "@/constants";

export const convertIcsTimezoneProp = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertTimezoneProp<T>>
): ReturnType<ConvertTimezoneProp<T>> => {
  const [schema, rawTimezonePropString, options] = args;

  const rawType = rawTimezonePropString
    .split("BEGIN:")[1]
    .split(BREAK_REGEX)[0];

  const type = TIMEZONE_PROP_COMPONENTS.includes(rawType as IcsTimezonePropType)
    ? (rawType as IcsTimezonePropType)
    : "STANDARD";

  const icsTimeZone = _convertIcsComponent(schema, rawTimezonePropString, {
    icsComponent: type,
    objectKeyMap: VTIMEZONE_PROP_TO_OBJECT_KEYS,
    convertValues: {
      start: ({ line }) => convertIcsDateTime(undefined, line),
      recurrenceRule: ({ line }) =>
        convertIcsRecurrenceRule(undefined, line, {
          timezones: options?.timezones,
        }),
      recurrenceDate: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
    },
    nonStandard: options?.nonStandard,
    timezones: options?.timezones,
  });

  icsTimeZone.type = type;

  return icsTimeZone;
};
