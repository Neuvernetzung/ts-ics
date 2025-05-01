import {
  getEventRegex,
  getTimezoneRegex,
  getTodoRegex,
  replaceCalendarRegex,
} from "@/constants";
import {
  VCALENDAR_TO_OBJECT_KEYS,
  type IcsCalendarKey,
} from "@/constants/keys";
import type {
  ConvertCalendar,
  IcsCalendarVersion,
  IcsCalendar,
  Line,
} from "@/types";

import { convertIcsEvent } from "./event";
import { convertIcsTimezone } from "./timezone";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";
import { convertNonStandardValues } from "./nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertIcsTodo } from "./todo";

export const convertIcsCalendar = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertCalendar<T>>
): ReturnType<ConvertCalendar<T>> => {
  const [schema, calendarString, options] = args;

  const cleanedFileString = calendarString.replace(replaceCalendarRegex, "");

  const lineStrings = splitLines(
    cleanedFileString
      .replace(getEventRegex, "")
      .replace(getTimezoneRegex, "")
      .replace(getTodoRegex, "")
  );

  const calendar: Partial<IcsCalendar> = {};

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsCalendarKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VCALENDAR_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "version") {
      calendar[objectKey] = line.value as IcsCalendarVersion;
      return;
    }

    calendar[objectKey] = line.value;
  });

  const timezoneStrings = [...cleanedFileString.matchAll(getTimezoneRegex)].map(
    (match) => match[0]
  );

  if (timezoneStrings.length > 0) {
    const timezones = timezoneStrings.map((timezoneString) =>
      convertIcsTimezone<T>(undefined, timezoneString, {
        nonStandard: options?.nonStandard,
      })
    );
    calendar.timezones = timezones;
  }

  const eventStrings = [...cleanedFileString.matchAll(getEventRegex)].map(
    (match) => match[0]
  );

  if (eventStrings.length > 0) {
    const events = eventStrings.map((eventString) =>
      convertIcsEvent<T>(undefined, eventString, {
        timezones: calendar.timezones,
        nonStandard: options?.nonStandard,
      })
    );
    calendar.events = events;
  }

  const todoStrings = [...cleanedFileString.matchAll(getTodoRegex)].map(
    (match) => match[0]
  );

  if (todoStrings.length > 0) {
    const todos = todoStrings.map((todoString) =>
      convertIcsTodo<T>(undefined, todoString, {
        timezones: calendar.timezones,
        nonStandard: options?.nonStandard,
      })
    );
    calendar.todos = todos;
  }

  const validatedCalendar = standardValidate(
    schema,
    calendar as IcsCalendar<T>
  );

  if (!options?.nonStandard) return validatedCalendar;

  return convertNonStandardValues(
    validatedCalendar,
    nonStandardValues,
    options?.nonStandard
  );
};
