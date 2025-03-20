import { VEVENT_TO_KEYS } from "@/constants/keys/event";
import {
  objectKeyIsArrayOfStrings,
  objectKeyIsTextString,
  objectKeyIsTimeStamp,
} from "@/constants/keyTypes";
import type {
  IcsDateObject,
  IcsEvent,
  IcsDuration,
  IcsRecurrenceRule,
  IcsRecurrenceId,
} from "@/types";
import type { IcsOrganizer } from "@/types/organizer";

import { generateIcsAlarm } from "./alarm";
import { generateIcsAttendee } from "./attendee";
import { generateIcsExceptionDate } from "./exceptionDate";
import { generateIcsDuration } from "./duration";
import { generateIcsOrganizer } from "./organizer";
import { generateIcsRecurrenceRule } from "./recurrenceRule";
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
import { generateIcsRecurrenceId } from "./recurrenceId";

type GenerateIcsEventOptions<T extends NonStandardValuesGeneric> = {
  skipFormatLines?: boolean;
  nonStandard?: GenerateNonStandardValues<T>;
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

    const icsKey = VEVENT_TO_KEYS[key];

    if (!icsKey) return;

    const value = event[key];

    if (value === undefined || value === null) return;

    if (objectKeyIsTimeStamp(key)) {
      icsString += generateIcsTimeStamp(icsKey, value as IcsDateObject);
      return;
    }

    if (objectKeyIsArrayOfStrings(key)) {
      icsString += generateIcsLine(icsKey, (value as string[]).join(","));
      return;
    }

    if (objectKeyIsTextString(key)) {
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
      icsString += (value as number).toString();
      return;
    }

    if (key === "recurrenceId") {
      icsString += generateIcsRecurrenceId(value as IcsRecurrenceId);
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (event.alarms && event.alarms.length > 0) {
    event.alarms.forEach((alarm) => {
      icsString += generateIcsAlarm(alarm);
    });
  }

  if (event.attendees && event.attendees.length > 0) {
    event.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  if (event.exceptionDates && event.exceptionDates.length > 0) {
    event.exceptionDates.forEach((exceptionDate) => {
      icsString += generateIcsExceptionDate(exceptionDate, "EXDATE");
    });
  }

  icsString += getIcsEndLine("VEVENT");

  if (options?.skipFormatLines) return icsString;

  return formatLines(icsString);
};
