import {
  VCALENDAR_OBJECT_KEY,
  VCALENDAR_TO_OBJECT_KEYS,
  VEVENT_OBJECT_KEY,
  VFREEBUSY_OBJECT_KEY,
  VJOURNAL_OBJECT_KEY,
  VTIMEZONE_OBJECT_KEY,
  VTODO_OBJECT_KEY,
} from "@/constants/keys";
import type { ConvertCalendar, IcsCalendarVersion } from "@/types";

import { convertIcsEvent } from "../components/event";
import { convertIcsTimezone } from "../components/timezone";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { convertIcsTodo } from "../components/todo";
import { convertIcsJournal } from "../components/journal";
import { convertIcsFreeBusy } from "../components/freebusy";
import { _convertIcsComponent } from "./_component";

export const convertIcsCalendar = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertCalendar<T>>
): ReturnType<ConvertCalendar<T>> => {
  const [schema, calendarString, options] = args;

  return _convertIcsComponent(schema, calendarString, {
    icsComponent: VCALENDAR_OBJECT_KEY,
    objectKeyMap: VCALENDAR_TO_OBJECT_KEYS,
    convertValues: {
      version: ({ line }) => line.value as IcsCalendarVersion,
    },
    childComponents: {
      timezones: {
        icsComponent: VTIMEZONE_OBJECT_KEY,
        convert: (rawTimezoneString) =>
          convertIcsTimezone(undefined, rawTimezoneString, {
            nonStandard: options?.nonStandard,
          }),
      },
      events: {
        icsComponent: VEVENT_OBJECT_KEY,
        convert: (rawEventString, { data }) =>
          convertIcsEvent(undefined, rawEventString, {
            nonStandard: options?.nonStandard,
            timezones: data.timezones,
          }),
      },
      todos: {
        icsComponent: VTODO_OBJECT_KEY,
        convert: (rawTodoString, { data }) =>
          convertIcsTodo(undefined, rawTodoString, {
            nonStandard: options?.nonStandard,
            timezones: data.timezones,
          }),
      },
      journals: {
        icsComponent: VJOURNAL_OBJECT_KEY,
        convert: (rawJournalString, { data }) =>
          convertIcsJournal(undefined, rawJournalString, {
            nonStandard: options?.nonStandard,
            timezones: data.timezones,
          }),
      },
      freeBusy: {
        icsComponent: VFREEBUSY_OBJECT_KEY,
        convert: (rawFreeBusyString, { data }) =>
          convertIcsFreeBusy(undefined, rawFreeBusyString, {
            nonStandard: options?.nonStandard,
            timezones: data.timezones,
          }),
      },
    },
    nonStandard: options?.nonStandard,
  });
};
