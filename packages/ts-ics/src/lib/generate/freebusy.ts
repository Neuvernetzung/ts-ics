import { VFREEBUSY_TO_KEYS } from "@/constants/keys/freebusy";

import type {
  IcsDateObject,
  IcsFreeBusy,
  IcsFreeBusyTime,
  IcsTimezone,
} from "@/types";
import type { IcsOrganizer } from "@/types/organizer";

import { generateIcsAttendee } from "./attendee";
import { generateIcsOrganizer } from "./organizer";
import { generateIcsTimeStamp } from "./timeStamp";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "./utils/addLine";
import { getKeys } from "./utils/getKeys";
import { formatLines } from "./utils/formatLines";
import { escapeTextString } from "./utils/escapeText";
import { generateNonStandardValues } from "./nonStandardValues";
import type {
  GenerateNonStandardValues,
  NonStandardValuesGeneric,
} from "@/types/nonStandardValues";
import {
  freeBusyObjectKeyIsTextString,
  freeBusyObjectKeyIsTimeStamp,
} from "@/constants/keyTypes/freebusy";
import { generateIcsFreeBusyTime } from "./freebusyValue";

type GenerateIcsFreeBusyOptions<T extends NonStandardValuesGeneric> = {
  skipFormatLines?: boolean;
  nonStandard?: GenerateNonStandardValues<T>;
  timezones?: IcsTimezone[];
};

export const generateIcsFreeBusy = <T extends NonStandardValuesGeneric>(
  freeBusy: IcsFreeBusy,
  options?: GenerateIcsFreeBusyOptions<T>
) => {
  const freeBusyKeys = getKeys(freeBusy);

  let icsString = "";

  icsString += getIcsStartLine("VFREEBUSY");

  freeBusyKeys.forEach((key) => {
    if (key === "attendees") return;

    if (key === "nonStandard") {
      icsString += generateNonStandardValues(
        freeBusy[key],
        options?.nonStandard
      );
      return;
    }

    const icsKey = VFREEBUSY_TO_KEYS[key];

    if (!icsKey) return;

    const value = freeBusy[key];

    if (value === undefined || value === null) return;

    if (freeBusyObjectKeyIsTimeStamp(key)) {
      icsString += generateIcsTimeStamp(
        icsKey,
        value as IcsDateObject,
        undefined,
        { timezones: options?.timezones, forceUtc: key === "stamp" }
      );
      return;
    }

    if (freeBusyObjectKeyIsTextString(key)) {
      icsString += generateIcsLine(icsKey, escapeTextString(value as string));
      return;
    }

    if (key === "organizer") {
      icsString += generateIcsOrganizer(value as IcsOrganizer);
      return;
    }

    if (key === "freeBusy") {
      (value as IcsFreeBusyTime[]).forEach((v) => {
        icsString += generateIcsFreeBusyTime(v, "FREEBUSY");
      });
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (freeBusy.attendees && freeBusy.attendees.length > 0) {
    freeBusy.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  icsString += getIcsEndLine("VFREEBUSY");

  if (options?.skipFormatLines) return icsString;

  return formatLines(icsString);
};
