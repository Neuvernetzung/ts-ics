import { COMMA, VALARM_OBJECT_KEY, VEVENT_OBJECT_KEY } from "@/constants";
import { VEVENT_TO_OBJECT_KEYS } from "@/constants/keys/event";
import type { ConvertEvent } from "@/types";

import { convertIcsAlarm } from "./alarm";
import { convertIcsAttendee } from "../values/attendee";
import { convertIcsDuration } from "../values/duration";
import { convertIcsOrganizer } from "../values/organizer";
import { convertIcsRecurrenceRule } from "../values/recurrenceRule";
import { convertIcsTimeStamp } from "../values/timeStamp";
import { convertIcsExceptionDates } from "../values/exceptionDate";
import { convertIcsRecurrenceId } from "../values/recurrenceId";
import { convertIcsClass } from "../values/class";
import { convertIcsEventStatus } from "../values/status";
import { convertIcsTimeTransparent } from "../values/timeTransparent";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { _convertIcsComponent } from "./_component";
import { convertIcsInteger } from "../values/integer";
import { convertIcsText } from "../values";

export const convertIcsEvent = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertEvent<T>>
): ReturnType<ConvertEvent<T>> => {
  const [schema, rawEventString, options] = args;

  let altRep: string | undefined;

  const event = _convertIcsComponent(schema, rawEventString, {
    icsComponent: VEVENT_OBJECT_KEY,
    objectKeyMap: VEVENT_TO_OBJECT_KEYS,
    convertValues: {
      stamp: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      start: ({ line }) =>
        convertIcsTimeStamp(undefined, line, {
          timezones: options?.timezones,
        }),
      end: ({ line }) =>
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
      categories: ({ line }) => line.value.split(COMMA),
      description: ({ line }) => {
        if (line.options?.ALTREP) {
          altRep = line.options.ALTREP;
        }

        return convertIcsText(undefined, line);
      },
      location: ({ line }) => convertIcsText(undefined, line),
      comment: ({ line }) => convertIcsText(undefined, line),
      summary: ({ line }) => convertIcsText(undefined, line),
      recurrenceRule: ({ line }) =>
        convertIcsRecurrenceRule(undefined, line, {
          timezones: options?.timezones,
        }),
      duration: ({ line }) => convertIcsDuration(undefined, line),
      organizer: ({ line }) => convertIcsOrganizer(undefined, line),
      sequence: ({ line }) => convertIcsInteger(undefined, line),
      class: ({ line }) => convertIcsClass(undefined, line),
      recurrenceId: ({ line }) =>
        convertIcsRecurrenceId(undefined, line, {
          timezones: options?.timezones,
        }),
      status: ({ line }) => convertIcsEventStatus(undefined, line),
      timeTransparent: ({ line }) => convertIcsTimeTransparent(undefined, line),
    },
    convertArrayValues: {
      attendees: ({ line }) => convertIcsAttendee(undefined, line),
      exceptionDates: ({ line }) =>
        convertIcsExceptionDates(undefined, line, {
          timezones: options?.timezones,
        }),
    },
    childComponents: {
      alarms: {
        icsComponent: VALARM_OBJECT_KEY,
        convert: (rawAlarmString) =>
          convertIcsAlarm(undefined, rawAlarmString, {
            nonStandard: options?.nonStandard,
            timezones: options?.timezones,
          }),
      },
    },
    timezones: options?.timezones,
    nonStandard: options?.nonStandard,
  });

  if (altRep) {
    event.descriptionAltRep = altRep;
  }

  return event;
};
