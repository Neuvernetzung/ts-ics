import { VJOURNAL_TO_KEYS } from "@/constants/keys/journal";

import type {
  IcsDateObject,
  IcsJournal,
  IcsRecurrenceRule,
  IcsRecurrenceId,
  IcsTimezone,
} from "@/types";
import type { IcsOrganizer } from "@/types/organizer";

import { generateIcsAttendee } from "./attendee";
import { generateIcsExceptionDate } from "./exceptionDate";
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
  journalObjectKeyIsArrayOfStrings,
  journalObjectKeyIsTextString,
  journalObjectKeyIsTimeStamp,
} from "@/constants/keyTypes/journal";

type GenerateIcsJournalOptions<T extends NonStandardValuesGeneric> = {
  skipFormatLines?: boolean;
  nonStandard?: GenerateNonStandardValues<T>;
  timezones?: IcsTimezone[];
};

export const generateIcsJournal = <T extends NonStandardValuesGeneric>(
  journal: IcsJournal,
  options?: GenerateIcsJournalOptions<T>
) => {
  const journalKeys = getKeys(journal);

  let icsString = "";

  icsString += getIcsStartLine("VJOURNAL");

  journalKeys.forEach((key) => {
    if (key === "attendees" || key === "exceptionDates") return;

    if (key === "nonStandard") {
      icsString += generateNonStandardValues(
        journal[key],
        options?.nonStandard
      );
      return;
    }

    const icsKey = VJOURNAL_TO_KEYS[key];

    if (!icsKey) return;

    const value = journal[key];

    if (value === undefined || value === null) return;

    if (journalObjectKeyIsTimeStamp(key)) {
      icsString += generateIcsTimeStamp(
        icsKey,
        value as IcsDateObject,
        undefined,
        { timezones: options?.timezones, forceUtc: key === "stamp" }
      );
      return;
    }

    if (journalObjectKeyIsArrayOfStrings(key)) {
      icsString += generateIcsLine(icsKey, (value as string[]).join(","));
      return;
    }

    if (journalObjectKeyIsTextString(key)) {
      icsString += generateIcsLine(icsKey, escapeTextString(value as string));
      return;
    }

    if (key === "recurrenceRule") {
      icsString += generateIcsRecurrenceRule(value as IcsRecurrenceRule);
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

  if (journal.attendees && journal.attendees.length > 0) {
    journal.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  if (journal.exceptionDates && journal.exceptionDates.length > 0) {
    journal.exceptionDates.forEach((exceptionDate) => {
      icsString += generateIcsExceptionDate(exceptionDate, "EXDATE", {
        timezones: options?.timezones,
      });
    });
  }

  icsString += getIcsEndLine("VJOURNAL");

  if (options?.skipFormatLines) return icsString;

  return formatLines(icsString);
};
