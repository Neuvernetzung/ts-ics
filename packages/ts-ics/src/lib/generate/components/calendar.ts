import { VCALENDAR_TO_KEYS } from "@/constants/keys";
import type { IcsCalendar } from "@/types";

import { generateIcsEvent } from "./event";
import { generateIcsTimezone } from "./timezone";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "../utils/addLine";
import { formatLines } from "../utils/formatLines";
import { getKeys } from "../utils/getKeys";
import { generateNonStandardValues } from "../nonStandard/nonStandardValues";
import type {
  GenerateNonStandardValues,
  NonStandardValuesGeneric,
} from "@/types/nonStandardValues";
import { generateIcsTodo } from "./todo";
import { generateIcsJournal } from "./journal";
import { generateIcsFreeBusy } from "./freebusy";

export const generateIcsCalendar = <T extends NonStandardValuesGeneric>(
  calendar: IcsCalendar,
  options?: { nonStandard?: GenerateNonStandardValues<T> }
) => {
  const calendarKeys = getKeys(calendar);

  let icsString = "";

  icsString += getIcsStartLine("VCALENDAR");

  calendarKeys.forEach((key) => {
    if (
      key === "events" ||
      key === "timezones" ||
      key === "todos" ||
      key === "journals" ||
      key === "freeBusy"
    )
      return;

    if (key === "nonStandard") {
      icsString += generateNonStandardValues(
        calendar[key],
        options?.nonStandard
      );
      return;
    }

    const icsKey = VCALENDAR_TO_KEYS[key];

    if (!icsKey) return;

    const value = calendar[key];

    icsString += generateIcsLine(icsKey, value);
  });

  if (calendar.timezones && calendar.timezones.length > 0) {
    calendar.timezones.forEach((timezone) => {
      icsString += generateIcsTimezone(timezone, {
        nonStandard: options?.nonStandard,
      });
    });
  }

  if (calendar.events && calendar.events.length > 0) {
    calendar.events.forEach((event) => {
      icsString += generateIcsEvent(event, {
        skipFormatLines: true,
        timezones: calendar.timezones,
        nonStandard: options?.nonStandard,
      });
    });
  }

  if (calendar.todos && calendar.todos.length > 0) {
    calendar.todos.forEach((todo) => {
      icsString += generateIcsTodo(todo, {
        skipFormatLines: true,
        timezones: calendar.timezones,
        nonStandard: options?.nonStandard,
      });
    });
  }

  if (calendar.journals && calendar.journals.length > 0) {
    calendar.journals.forEach((journal) => {
      icsString += generateIcsJournal(journal, {
        skipFormatLines: true,
        timezones: calendar.timezones,
        nonStandard: options?.nonStandard,
      });
    });
  }

  if (calendar.freeBusy && calendar.freeBusy.length > 0) {
    calendar.freeBusy.forEach((freeBusy) => {
      icsString += generateIcsFreeBusy(freeBusy, {
        skipFormatLines: true,
        timezones: calendar.timezones,
        nonStandard: options?.nonStandard,
      });
    });
  }

  icsString += getIcsEndLine("VCALENDAR");

  return formatLines(icsString);
};
