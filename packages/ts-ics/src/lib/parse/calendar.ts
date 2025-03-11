import {
  getEventRegex,
  getTimezoneRegex,
  replaceCalendarRegex,
} from "@/constants";
import { VCALENDAR_TO_OBJECT_KEYS, type VCalendarKey } from "@/constants/keys";
import { type VCalendar } from "@/types";

import { icsEventToObject } from "./event";
import { icsTimezoneToObject } from "./timezone";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export const icsCalendarToObject = (
  calendarString: string,
  schema: StandardSchemaV1<VCalendar> | undefined
): VCalendar => {
  const cleanedFileString = calendarString.replace(replaceCalendarRegex, "");

  const lineStrings = splitLines(
    cleanedFileString.replace(getEventRegex, "").replace(getTimezoneRegex, "")
  );

  const calendar: Partial<VCalendar> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<VCalendarKey>(lineString);

    const objectKey = VCALENDAR_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "version") {
      calendar[objectKey] = "2.0";
      return;
    }

    calendar[objectKey] = line.value;
  });

  const timezoneStrings = [...cleanedFileString.matchAll(getTimezoneRegex)].map(
    (match) => match[0]
  );

  if (timezoneStrings.length > 0) {
    const timezones = timezoneStrings.map((timezoneString) =>
      icsTimezoneToObject(timezoneString, undefined)
    );
    calendar.timezones = timezones;
  }

  const eventStrings = [...cleanedFileString.matchAll(getEventRegex)].map(
    (match) => match[0]
  );

  if (eventStrings.length > 0) {
    const events = eventStrings.map((eventString) =>
      icsEventToObject(eventString, undefined, {
        timezones: calendar.timezones,
      })
    );
    calendar.events = events;
  }

  return standardValidate(schema, calendar as VCalendar);
};
