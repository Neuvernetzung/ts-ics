import { COMMA, VJOURNAL_OBJECT_KEY } from "@/constants";
import { VJOURNAL_TO_OBJECT_KEYS } from "@/constants/keys/journal";
import type { ConvertJournal } from "@/types";

import { convertIcsAttendee } from "../values/attendee";
import { convertIcsOrganizer } from "../values/organizer";
import { convertIcsRecurrenceRule } from "../values/recurrenceRule";
import { convertIcsTimeStamp } from "../values/timeStamp";
import { convertIcsExceptionDates } from "../values/exceptionDate";
import { unescapeTextString } from "../utils/unescapeText";
import { convertIcsRecurrenceId } from "../values/recurrenceId";
import { convertIcsClass } from "../values/class";
import { convertIcsJournalStatus } from "../values/status";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { _convertIcsComponent } from "./_component";

export const convertIcsJournal = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertJournal<T>>
): ReturnType<ConvertJournal<T>> => {
  const [schema, rawJournalString, options] = args;

  return _convertIcsComponent(schema, rawJournalString, {
    icsComponent: VJOURNAL_OBJECT_KEY,
    objectKeyMap: VJOURNAL_TO_OBJECT_KEYS,
    convertValues: {
      stamp: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      start: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      created: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      lastModified: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      categories: ({ line }) => line.value.split(COMMA),
      description: ({ line }) => unescapeTextString(line.value),
      comment: ({ line }) => unescapeTextString(line.value),
      summary: ({ line }) => unescapeTextString(line.value),
      recurrenceRule: ({ line }) =>
        convertIcsRecurrenceRule(undefined, line, {
          timezones: options?.timezones,
        }),
      organizer: ({ line }) => convertIcsOrganizer(undefined, line),
      sequence: ({ line }) => Number.parseInt(line.value),
      class: ({ line }) => convertIcsClass(undefined, line),
      recurrenceId: ({ line }) =>
        convertIcsRecurrenceId(undefined, line, {
          timezones: options?.timezones,
        }),
      status: ({ line }) => convertIcsJournalStatus(undefined, line),
    },
    convertArrayValues: {
      attendees: ({ line }) => convertIcsAttendee(undefined, line),
      exceptionDates: ({ line }) =>
        convertIcsExceptionDates(undefined, line, {
          timezones: options?.timezones,
        }),
    },
    nonStandard: options?.nonStandard,
    timezones: options?.timezones,
  });
};
