import { VTODO_TO_KEYS } from "@/constants/keys/todo";

import type {
  IcsDateObject,
  IcsTodo,
  IcsDuration,
  IcsRecurrenceRule,
  IcsRecurrenceId,
  IcsTimezone,
} from "@/types";
import type { IcsOrganizer } from "@/types/organizer";

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
import {
  todoObjectKeyIsArrayOfStrings,
  todoObjectKeyIsTextString,
  todoObjectKeyIsTimeStamp,
} from "@/constants/keyTypes/todo";

type GenerateIcsTodoOptions<T extends NonStandardValuesGeneric> = {
  skipFormatLines?: boolean;
  nonStandard?: GenerateNonStandardValues<T>;
  timezones?: IcsTimezone[];
};

export const generateIcsTodo = <T extends NonStandardValuesGeneric>(
  todo: IcsTodo,
  options?: GenerateIcsTodoOptions<T>
) => {
  const todoKeys = getKeys(todo);

  let icsString = "";

  icsString += getIcsStartLine("VTODO");

  todoKeys.forEach((key) => {
    if (key === "attendees" || key === "exceptionDates") return;

    if (key === "nonStandard") {
      icsString += generateNonStandardValues(todo[key], options?.nonStandard);
      return;
    }

    const icsKey = VTODO_TO_KEYS[key];

    if (!icsKey) return;

    const value = todo[key];

    if (value === undefined || value === null) return;

    if (todoObjectKeyIsTimeStamp(key)) {
      icsString += generateIcsTimeStamp(
        icsKey,
        value as IcsDateObject,
        undefined,
        { timezones: options?.timezones, forceUtc: key === "stamp" }
      );
      return;
    }

    if (todoObjectKeyIsArrayOfStrings(key)) {
      icsString += generateIcsLine(icsKey, (value as string[]).join(","));
      return;
    }

    if (todoObjectKeyIsTextString(key)) {
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

  if (todo.attendees && todo.attendees.length > 0) {
    todo.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  if (todo.exceptionDates && todo.exceptionDates.length > 0) {
    todo.exceptionDates.forEach((exceptionDate) => {
      icsString += generateIcsExceptionDate(exceptionDate, "EXDATE", {
        timezones: options?.timezones,
      });
    });
  }

  icsString += getIcsEndLine("VTODO");

  if (options?.skipFormatLines) return icsString;

  return formatLines(icsString);
};
