import { VFREEBUSY_OBJECT_KEY } from "@/constants";
import { VFREEBUSY_TO_OBJECT_KEYS } from "@/constants/keys/freebusy";
import type { ConvertFreeBusy } from "@/types";

import { convertIcsAttendee } from "../values/attendee";
import { convertIcsOrganizer } from "../values/organizer";
import { convertIcsTimeStamp } from "../values/timeStamp";
import { unescapeTextString } from "../utils/unescapeText";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { convertIcsFreeBusyTime } from "../values/freebusyValue";
import { _convertIcsComponent } from "./_component";

export const convertIcsFreeBusy = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertFreeBusy<T>>
): ReturnType<ConvertFreeBusy<T>> => {
  const [schema, rawFreeBusyString, options] = args;

  return _convertIcsComponent(schema, rawFreeBusyString, {
    icsComponent: VFREEBUSY_OBJECT_KEY,
    objectKeyMap: VFREEBUSY_TO_OBJECT_KEYS,
    convertValues: {
      stamp: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      start: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      end: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      comment: ({ line }) => unescapeTextString(line.value),
      organizer: ({ line }) => convertIcsOrganizer(undefined, line),
    },
    convertArrayValues: {
      attendees: ({ line }) => convertIcsAttendee(undefined, line),
      freeBusy: ({ line }) => convertIcsFreeBusyTime(undefined, line),
    },
    nonStandard: options?.nonStandard,
    timezones: options?.timezones,
  });
};
