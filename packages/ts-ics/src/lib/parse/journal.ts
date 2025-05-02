import { COMMA, getAlarmRegex, replaceJournalRegex } from "@/constants";
import {
  VJOURNAL_TO_OBJECT_KEYS,
  type IcsJournalKey,
} from "@/constants/keys/journal";
import type { IcsJournal, IcsDateObject, ConvertJournal, Line } from "@/types";
import type { IcsAttendee } from "@/types/attendee";

import {
  journalObjectKeyIsArrayOfStrings,
  journalObjectKeyIsTextString,
  journalObjectKeyIsTimeStamp,
} from "../../constants/keyTypes/journal";
import { convertIcsAttendee } from "./attendee";
import { convertIcsOrganizer } from "./organizer";
import { convertIcsRecurrenceRule } from "./recurrenceRule";
import { convertIcsTimeStamp } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { convertIcsExceptionDates } from "./exceptionDate";
import { unescapeTextString } from "./utils/unescapeText";
import { convertIcsRecurrenceId } from "./recurrenceId";
import { convertIcsClass } from "./class";
import { convertIcsJournalStatus } from "./status";
import { standardValidate } from "./utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsJournal = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertJournal<T>>
): ReturnType<ConvertJournal<T>> => {
  const [schema, rawJournalString, options] = args;

  const journalString = rawJournalString.replace(replaceJournalRegex, "");

  const lineStrings = splitLines(journalString.replace(getAlarmRegex, ""));

  const journal: Partial<IcsJournal> = {};

  const attendees: IcsAttendee[] = [];
  const exceptionDates: IcsDateObject[] = [];

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsJournalKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VJOURNAL_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (journalObjectKeyIsTimeStamp(objectKey)) {
      journal[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (journalObjectKeyIsArrayOfStrings(objectKey)) {
      journal[objectKey] = line.value.split(COMMA);

      return;
    }

    if (journalObjectKeyIsTextString(objectKey)) {
      journal[objectKey] = unescapeTextString(line.value);
      return;
    }

    if (objectKey === "recurrenceRule") {
      journal[objectKey] = convertIcsRecurrenceRule(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "organizer") {
      journal[objectKey] = convertIcsOrganizer(undefined, line);
      return;
    }

    if (objectKey === "sequence") {
      journal[objectKey] = parseInt(line.value);
      return;
    }

    if (objectKey === "attendees") {
      attendees.push(convertIcsAttendee(undefined, line));
      return;
    }

    if (objectKey === "exceptionDates") {
      exceptionDates.push(
        ...convertIcsExceptionDates(undefined, line, {
          timezones: options?.timezones,
        })
      );
      return;
    }

    if (objectKey === "class") {
      journal[objectKey] = convertIcsClass(undefined, line);
      return;
    }

    if (objectKey === "recurrenceId") {
      journal[objectKey] = convertIcsRecurrenceId(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "status") {
      journal[objectKey] = convertIcsJournalStatus(undefined, line);
      return;
    }

    journal[objectKey] = line.value; // Set string value
  });

  if (attendees.length > 0) {
    journal.attendees = attendees;
  }

  if (exceptionDates.length > 0) {
    journal.exceptionDates = exceptionDates;
  }

  const validatedJournal = standardValidate(schema, journal as IcsJournal<T>);

  if (!options?.nonStandard) return validatedJournal;

  return convertNonStandardValues(
    validatedJournal,
    nonStandardValues,
    options?.nonStandard
  );
};
