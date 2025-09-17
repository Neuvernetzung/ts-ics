import { COMMA, getAlarmRegex, replaceEventRegex } from "@/constants";
import {
  VEVENT_TO_OBJECT_KEYS,
  type IcsEventKey,
} from "@/constants/keys/event";
import type { IcsEvent, IcsDateObject, ConvertEvent, Line } from "@/types";
import type { IcsAttendee } from "@/types/attendee";

import {
  eventObjectKeyIsArrayOfStrings,
  eventObjectKeyIsTextString,
  eventObjectKeyIsTimeStamp,
} from "@/constants/keyTypes/event";
import { convertIcsAlarm } from "./alarm";
import { convertIcsAttendee } from "../values/attendee";
import { convertIcsDuration } from "../values/duration";
import { convertIcsOrganizer } from "../values/organizer";
import { convertIcsRecurrenceRule } from "../values/recurrenceRule";
import { convertIcsTimeStamp } from "../values/timeStamp";
import { getLine } from "../utils/line";
import { splitLines } from "../utils/splitLines";
import { convertIcsExceptionDates } from "../values/exceptionDate";
import { unescapeTextString } from "../utils/unescapeText";
import { convertIcsRecurrenceId } from "../values/recurrenceId";
import { convertIcsClass } from "../values/class";
import { convertIcsEventStatus } from "../values/status";
import { convertIcsTimeTransparent } from "../values/timeTransparent";
import { standardValidate } from "../utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "../nonStandard/nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsEvent = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertEvent<T>>
): ReturnType<ConvertEvent<T>> => {
  const [schema, rawEventString, options] = args;

  const eventString = rawEventString.replace(replaceEventRegex, "");

  const lineStrings = splitLines(eventString.replace(getAlarmRegex, ""));

  const event: Partial<IcsEvent> = {};

  const attendees: IcsAttendee[] = [];
  const exceptionDates: IcsDateObject[] = [];

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsEventKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VEVENT_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (eventObjectKeyIsTimeStamp(objectKey)) {
      event[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (eventObjectKeyIsArrayOfStrings(objectKey)) {
      event[objectKey] = line.value.split(COMMA);

      return;
    }

    if (eventObjectKeyIsTextString(objectKey)) {
      if (objectKey === "description" && line.options?.ALTREP) {
        event.descriptionAltRep = line.options.ALTREP;
      }
      event[objectKey] = unescapeTextString(line.value);
      return;
    }

    if (objectKey === "recurrenceRule") {
      event[objectKey] = convertIcsRecurrenceRule(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "duration") {
      event[objectKey] = convertIcsDuration(undefined, line);
      return;
    }

    if (objectKey === "organizer") {
      event[objectKey] = convertIcsOrganizer(undefined, line);
      return;
    }

    if (objectKey === "sequence") {
      event[objectKey] = Number.parseInt(line.value);
      return;
    }

    if (objectKey === "attendees") {
      attendees.push(convertIcsAttendee(undefined, line));
      return;
    }

    if (objectKey === "exceptionDates") {
      exceptionDates.push(
        ...convertIcsExceptionDates(undefined, line, {
          timezones: options?.timezones,
        })
      );
      return;
    }

    if (objectKey === "alarms") return;

    if (objectKey === "class") {
      event[objectKey] = convertIcsClass(undefined, line);
      return;
    }

    if (objectKey === "recurrenceId") {
      event[objectKey] = convertIcsRecurrenceId(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "status") {
      event[objectKey] = convertIcsEventStatus(undefined, line);
      return;
    }

    if (objectKey === "timeTransparent") {
      event[objectKey] = convertIcsTimeTransparent(undefined, line);
      return;
    }

    event[objectKey] = line.value; // Set string value
  });

  const alarmStrings = [...rawEventString.matchAll(getAlarmRegex)].map(
    (match) => match[0]
  );

  if (alarmStrings.length > 0) {
    const alarms = alarmStrings.map((alarmString) =>
      convertIcsAlarm(undefined, alarmString, options)
    );

    event.alarms = alarms;
  }

  if (attendees.length > 0) {
    event.attendees = attendees;
  }

  if (exceptionDates.length > 0) {
    event.exceptionDates = exceptionDates;
  }

  const validatedEvent = standardValidate(schema, event as IcsEvent<T>);

  if (!options?.nonStandard) return validatedEvent;

  return convertNonStandardValues(
    validatedEvent,
    nonStandardValues,
    options?.nonStandard
  );
};
