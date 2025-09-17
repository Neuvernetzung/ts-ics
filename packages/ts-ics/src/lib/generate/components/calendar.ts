import { VCALENDAR_OBJECT_KEY, VCALENDAR_TO_KEYS } from "@/constants/keys";
import type { IcsCalendar } from "@/types";

import { generateIcsEvent } from "./event";
import { generateIcsTimezone } from "./timezone";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { generateIcsTodo } from "./todo";
import { generateIcsJournal } from "./journal";
import { generateIcsFreeBusy } from "./freebusy";
import { _generateIcsComponent, GenerateIcsComponentProps } from "./_component";

export const generateIcsCalendar = <T extends NonStandardValuesGeneric>(
  calendar: IcsCalendar,
  options?: Pick<GenerateIcsComponentProps<IcsCalendar, T>, "nonStandard">
) =>
  _generateIcsComponent(calendar, {
    icsComponent: VCALENDAR_OBJECT_KEY,
    icsKeyMap: VCALENDAR_TO_KEYS,
    generateValues: {},
    childComponents: {
      timezones: (timezone) =>
        generateIcsTimezone(timezone, {
          nonStandard: options?.nonStandard,
          skipFormatLines: true,
        }),
      events: (event) =>
        generateIcsEvent(event, {
          skipFormatLines: true,
          timezones: calendar.timezones,
          nonStandard: options?.nonStandard,
        }),
      todos: (todo) =>
        generateIcsTodo(todo, {
          skipFormatLines: true,
          timezones: calendar.timezones,
          nonStandard: options?.nonStandard,
        }),
      journals: (journal) =>
        generateIcsJournal(journal, {
          skipFormatLines: true,
          timezones: calendar.timezones,
          nonStandard: options?.nonStandard,
        }),
      freeBusy: (freeBusy) =>
        generateIcsFreeBusy(freeBusy, {
          skipFormatLines: true,
          timezones: calendar.timezones,
          nonStandard: options?.nonStandard,
        }),
    },
    nonStandard: options?.nonStandard,
  });
