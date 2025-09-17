import { VFREEBUSY_TO_KEYS } from "@/constants/keys/freebusy";

import type { IcsFreeBusy } from "@/types";

import { generateIcsAttendee } from "../values/attendee";
import { generateIcsOrganizer } from "../values/organizer";
import { generateIcsTimeStamp } from "../values/timeStamp";
import { generateIcsLine } from "../utils/addLine";
import { escapeTextString } from "../utils/escapeText";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { generateIcsFreeBusyTime } from "../values/freebusyValue";
import {
  _generateIcsComponent,
  type GenerateIcsComponentProps,
} from "./_component";
import { VFREEBUSY_OBJECT_KEY } from "@/constants";

export const generateIcsFreeBusy = <T extends NonStandardValuesGeneric>(
  freeBusy: IcsFreeBusy,
  options?: Pick<
    GenerateIcsComponentProps<IcsFreeBusy, T>,
    "nonStandard" | "skipFormatLines" | "timezones"
  >
) =>
  _generateIcsComponent(freeBusy, {
    icsComponent: VFREEBUSY_OBJECT_KEY,
    icsKeyMap: VFREEBUSY_TO_KEYS,
    generateValues: {
      stamp: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
          forceUtc: true,
        }),
      start: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      end: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      comment: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      organizer: ({ value }) => generateIcsOrganizer(value),
    },
    generateArrayValues: {
      attendees: ({ value }) => generateIcsAttendee(value, "ATTENDEE"),
      freeBusy: ({ value }) => generateIcsFreeBusyTime(value, "FREEBUSY"),
    },
    nonStandard: options?.nonStandard,
    skipFormatLines: options?.skipFormatLines,
    timezones: options?.timezones,
  });
