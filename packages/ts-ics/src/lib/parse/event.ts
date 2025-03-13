import { COMMA, getAlarmRegex, replaceEventRegex } from "@/constants";
import {
  VEVENT_TO_OBJECT_KEYS,
  type IcsEventKey,
} from "@/constants/keys/event";
import type { IcsEvent, IcsDateObject, ConvertEvent, Line } from "@/types";
import type { IcsAttendee } from "@/types/attendee";

import {
  objectKeyIsArrayOfStrings,
  objectKeyIsTextString,
  objectKeyIsTimeStamp,
} from "../../constants/keyTypes/event";
import { convertIcsAlarm } from "./alarm";
import { convertIcsAttendee } from "./attendee";
import { convertIcsDuration } from "./duration";
import { convertIcsOrganizer } from "./organizer";
import { convertIcsRecurrenceRule } from "./recurrenceRule";
import { convertIcsTimeStamp } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { convertIcsExceptionDates } from "./exceptionDate";
import { unescapeTextString } from "./utils/unescapeText";
import { convertIcsRecurrenceId } from "./recurrenceId";
import { convertIcsClass } from "./class";
import { convertIcsStatus } from "./status";
import { convertIcsTimeTransparent } from "./timeTransparent";
import { standardValidate } from "./utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./nonStandardValues";
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

    if (objectKeyIsTimeStamp(objectKey)) {
      event[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKeyIsArrayOfStrings(objectKey)) {
      event[objectKey] = line.value.split(COMMA);

      return;
    }

    if (objectKeyIsTextString(objectKey)) {
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
      event[objectKey] = Number(line.value);
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
      event[objectKey] = convertIcsStatus(undefined, line);
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
