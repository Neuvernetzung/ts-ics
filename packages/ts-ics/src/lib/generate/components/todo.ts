import { VTODO_TO_KEYS } from "@/constants/keys/todo";

import type { IcsTodo } from "@/types";

import { generateIcsAttendee } from "../values/attendee";
import { generateIcsExceptionDate } from "../values/exceptionDate";
import { generateIcsDuration } from "../values/duration";
import { generateIcsOrganizer } from "../values/organizer";
import { generateIcsRecurrenceRule } from "../values/recurrenceRule";
import { generateIcsTimeStamp } from "../values/timeStamp";
import { generateIcsLine } from "../utils/addLine";
import { escapeTextString } from "../utils/escapeText";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { generateIcsRecurrenceId } from "../values/recurrenceId";
import { _generateIcsComponent, GenerateIcsComponentProps } from "./_component";
import { VTODO_OBJECT_KEY } from "@/constants";

export const generateIcsTodo = <T extends NonStandardValuesGeneric>(
  todo: IcsTodo,
  options?: Pick<
    GenerateIcsComponentProps<IcsTodo, T>,
    "nonStandard" | "skipFormatLines" | "timezones"
  >
) =>
  _generateIcsComponent(todo, {
    icsComponent: VTODO_OBJECT_KEY,
    icsKeyMap: VTODO_TO_KEYS,
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
      due: ({ icsKey, value }) =>
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
      completed: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      categories: ({ icsKey, value }) =>
        generateIcsLine(icsKey, value.join(",")),
      description: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      location: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      comment: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      summary: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      recurrenceRule: ({ value }) => generateIcsRecurrenceRule(value),
      duration: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsDuration(value)),
      organizer: ({ value }) => generateIcsOrganizer(value),
      sequence: ({ icsKey, value }) =>
        generateIcsLine(icsKey, value.toString()),
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
