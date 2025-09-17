import { COMMA, VTODO_OBJECT_KEY } from "@/constants";
import { VTODO_TO_OBJECT_KEYS } from "@/constants/keys/todo";
import type { ConvertTodo } from "@/types";

import { convertIcsAttendee } from "../values/attendee";
import { convertIcsDuration } from "../values/duration";
import { convertIcsOrganizer } from "../values/organizer";
import { convertIcsRecurrenceRule } from "../values/recurrenceRule";
import { convertIcsTimeStamp } from "../values/timeStamp";
import { convertIcsExceptionDates } from "../values/exceptionDate";
import { unescapeTextString } from "../utils/unescapeText";
import { convertIcsRecurrenceId } from "../values/recurrenceId";
import { convertIcsClass } from "../values/class";
import { convertIcsTodoStatus } from "../values/status";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { _convertIcsComponent } from "./_component";

export const convertIcsTodo = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertTodo<T>>
): ReturnType<ConvertTodo<T>> => {
  const [schema, rawTodoString, options] = args;

  return _convertIcsComponent(schema, rawTodoString, {
    icsComponent: VTODO_OBJECT_KEY,
    objectKeyMap: VTODO_TO_OBJECT_KEYS,
    convertValues: {
      stamp: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      start: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      due: ({ line }) =>
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
      completed: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      categories: ({ line }) => line.value.split(COMMA),
      description: ({ line }) => unescapeTextString(line.value),
      location: ({ line }) => unescapeTextString(line.value),
      comment: ({ line }) => unescapeTextString(line.value),
      summary: ({ line }) => unescapeTextString(line.value),
      recurrenceRule: ({ line }) =>
        convertIcsRecurrenceRule(undefined, line, {
          timezones: options?.timezones,
        }),
      duration: ({ line }) => convertIcsDuration(undefined, line),
      organizer: ({ line }) => convertIcsOrganizer(undefined, line),
      sequence: ({ line }) => Number.parseInt(line.value),
      percentComplete: ({ line }) => Number.parseInt(line.value),
      class: ({ line }) => convertIcsClass(undefined, line),
      recurrenceId: ({ line }) =>
        convertIcsRecurrenceId(undefined, line, {
          timezones: options?.timezones,
        }),
      status: ({ line }) => convertIcsTodoStatus(undefined, line),
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
