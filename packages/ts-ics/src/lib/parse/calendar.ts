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

export const icsCalendarToObject = (calendarString: string): VCalendar => {
  const cleanedFileString = calendarString.replace(replaceCalendarRegex, "");

  const lines = splitLines(
    cleanedFileString.replace(getEventRegex, "").replace(getTimezoneRegex, "")
  );

  const calendar: Partial<VCalendar> = {};

  lines.forEach((line) => {
    const { property, value } = getLine<VCalendarKey>(line);

    const objectKey = VCALENDAR_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "version") {
      calendar[objectKey] = "2.0";
      return;
    }

    calendar[objectKey] = value;
  });

  const timezoneStrings = [...cleanedFileString.matchAll(getTimezoneRegex)].map(
    (match) => match[0]
  );

  if (timezoneStrings.length > 0) {
    const timezones = timezoneStrings.map((timezoneString) =>
      icsTimezoneToObject(timezoneString)
    );
    calendar.timezones = timezones;
  }

  const eventStrings = [...cleanedFileString.matchAll(getEventRegex)].map(
    (match) => match[0]
  );

  if (eventStrings.length > 0) {
    const events = eventStrings.map((eventString) =>
      icsEventToObject(eventString, calendar.timezones)
    );
    calendar.events = events;
  }

  return calendar as VCalendar;
};
