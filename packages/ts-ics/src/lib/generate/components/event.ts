import { VEVENT_TO_KEYS } from "@/constants/keys/event";

import type {
  IcsDateObject,
  IcsEvent,
  IcsDuration,
  IcsRecurrenceRule,
  IcsRecurrenceId,
  IcsTimezone,
} from "@/types";
import type { IcsOrganizer } from "@/types/organizer";

import { generateIcsAlarm } from "./alarm";
import { generateIcsAttendee } from "../values/attendee";
import { generateIcsExceptionDate } from "../values/exceptionDate";
import { generateIcsDuration } from "../values/duration";
import { generateIcsOrganizer } from "../values/organizer";
import { generateIcsRecurrenceRule } from "../values/recurrenceRule";
import { generateIcsTimeStamp } from "../values/timeStamp";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "../utils/addLine";
import { getKeys } from "../utils/getKeys";
import { formatLines } from "../utils/formatLines";
import { escapeTextString } from "../utils/escapeText";
import { generateNonStandardValues } from "../nonStandard/nonStandardValues";
import type {
  GenerateNonStandardValues,
  NonStandardValuesGeneric,
} from "@/types/nonStandardValues";
import { generateIcsRecurrenceId } from "../values/recurrenceId";
import {
  eventObjectKeyIsArrayOfStrings,
  eventObjectKeyIsTextString,
  eventObjectKeyIsTimeStamp,
} from "@/constants/keyTypes";
import { generateIcsOptions } from "../utils/generateOptions";

type GenerateIcsEventOptions<T extends NonStandardValuesGeneric> = {
  skipFormatLines?: boolean;
  nonStandard?: GenerateNonStandardValues<T>;
  timezones?: IcsTimezone[];
};

export const generateIcsEvent = <T extends NonStandardValuesGeneric>(
  event: IcsEvent,
  options?: GenerateIcsEventOptions<T>
) => {
  const eventKeys = getKeys(event);

  let icsString = "";

  icsString += getIcsStartLine("VEVENT");

  eventKeys.forEach((key) => {
    if (key === "alarms" || key === "attendees" || key === "exceptionDates")
      return;

    if (key === "nonStandard") {
      icsString += generateNonStandardValues(event[key], options?.nonStandard);
      return;
    }

    if (key === "descriptionAltRep") {
      return;
    }

    const icsKey = VEVENT_TO_KEYS[key];

    if (!icsKey) return;

    const value = event[key];

    if (value === undefined || value === null) return;

    if (eventObjectKeyIsTimeStamp(key)) {
      icsString += generateIcsTimeStamp(
        icsKey,
        value as IcsDateObject,
        undefined,
        { timezones: options?.timezones, forceUtc: key === "stamp" }
      );
      return;
    }

    if (eventObjectKeyIsArrayOfStrings(key)) {
      icsString += generateIcsLine(icsKey, (value as string[]).join(","));
      return;
    }

    if (key === "description" && event.descriptionAltRep) {
      icsString += generateIcsLine(
        icsKey,
        escapeTextString(value as string),
        generateIcsOptions([
          { key: "ALTREP", value: `"${event.descriptionAltRep}"` },
        ])
      );
      return;
    }

    if (eventObjectKeyIsTextString(key)) {
      icsString += generateIcsLine(icsKey, escapeTextString(value as string));
      return;
    }

    if (key === "recurrenceRule") {
      icsString += generateIcsRecurrenceRule(value as IcsRecurrenceRule);
      return;
    }

    if (key === "duration") {
      icsString += generateIcsLine(
        icsKey,
        generateIcsDuration(value as IcsDuration)
      );
      return;
    }

    if (key === "organizer") {
      icsString += generateIcsOrganizer(value as IcsOrganizer);
      return;
    }

    if (key === "sequence") {
      icsString += generateIcsLine(icsKey, (value as number).toString());
      return;
    }

    if (key === "recurrenceId") {
      icsString += generateIcsRecurrenceId(value as IcsRecurrenceId, {
        timezones: options?.timezones,
      });
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (event.alarms && event.alarms.length > 0) {
    event.alarms.forEach((alarm) => {
      icsString += generateIcsAlarm(alarm, {
        nonStandard: options?.nonStandard,
      });
    });
  }

  if (event.attendees && event.attendees.length > 0) {
    event.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  if (event.exceptionDates && event.exceptionDates.length > 0) {
    event.exceptionDates.forEach((exceptionDate) => {
      icsString += generateIcsExceptionDate(exceptionDate, "EXDATE", {
        timezones: options?.timezones,
      });
    });
  }

  icsString += getIcsEndLine("VEVENT");

  if (options?.skipFormatLines) return icsString;

  return formatLines(icsString);
};
