import { VJOURNAL_TO_KEYS } from "@/constants/keys/journal";

import type { IcsJournal } from "@/types";

import { generateIcsAttendee } from "../values/attendee";
import { generateIcsExceptionDate } from "../values/exceptionDate";
import { generateIcsOrganizer } from "../values/organizer";
import { generateIcsRecurrenceRule } from "../values/recurrenceRule";
import { generateIcsTimeStamp } from "../values/timeStamp";
import { generateIcsLine } from "../utils/addLine";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { generateIcsRecurrenceId } from "../values/recurrenceId";
import {
  _generateIcsComponent,
  type GenerateIcsComponentProps,
} from "./_component";
import { VJOURNAL_OBJECT_KEY } from "@/constants";
import { generateIcsInteger } from "../values/integer";
import { generateIcsText } from "../values";

export const generateIcsJournal = <T extends NonStandardValuesGeneric>(
  journal: IcsJournal,
  options?: Pick<
    GenerateIcsComponentProps<IcsJournal, T>,
    "nonStandard" | "skipFormatLines" | "timezones"
  >
) =>
  _generateIcsComponent(journal, {
    icsComponent: VJOURNAL_OBJECT_KEY,
    icsKeyMap: VJOURNAL_TO_KEYS,
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
      created: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      lastModified: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      categories: ({ icsKey, value }) =>
        generateIcsLine(icsKey, value.join(",")),
      description: ({ icsKey, value }) => generateIcsText(icsKey, value),
      comment: ({ icsKey, value }) => generateIcsText(icsKey, value),
      summary: ({ icsKey, value }) => generateIcsText(icsKey, value),
      recurrenceRule: ({ value }) => generateIcsRecurrenceRule(value),
      organizer: ({ value }) => generateIcsOrganizer(value),
      sequence: ({ icsKey, value }) => generateIcsInteger(icsKey, value),
      recurrenceId: ({ value }) =>
        generateIcsRecurrenceId(value, {
          timezones: options?.timezones,
        }),
    },
    generateArrayValues: {
      attendees: ({ value }) => generateIcsAttendee(value, "ATTENDEE"),
      exceptionDates: ({ value }) =>
        generateIcsExceptionDate(value, "EXDATE", {
          timezones: options?.timezones,
        }),
    },
    nonStandard: options?.nonStandard,
    skipFormatLines: options?.skipFormatLines,
    timezones: options?.timezones,
  });
