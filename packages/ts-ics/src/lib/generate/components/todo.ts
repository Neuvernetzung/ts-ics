import { VTODO_TO_KEYS } from "@/constants/keys/todo";

import type { IcsTodo } from "@/types";

import { generateIcsAttendee } from "../values/attendee";
import { generateIcsExceptionDate } from "../values/exceptionDate";
import { generateIcsDuration } from "../values/duration";
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
import { VTODO_OBJECT_KEY } from "@/constants";
import { generateIcsInteger } from "../values/integer";
import { generateIcsText } from "../values";

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
      description: ({ icsKey, value }) => generateIcsText(icsKey, value),
      location: ({ icsKey, value }) => generateIcsText(icsKey, value),
      comment: ({ icsKey, value }) => generateIcsText(icsKey, value),
      summary: ({ icsKey, value }) => generateIcsText(icsKey, value),
      recurrenceRule: ({ value }) => generateIcsRecurrenceRule(value),
      duration: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsDuration(value)),
      organizer: ({ value }) => generateIcsOrganizer(value),
      sequence: ({ icsKey, value }) => generateIcsInteger(icsKey, value),
      percentComplete: ({ icsKey, value }) => generateIcsInteger(icsKey, value),
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
