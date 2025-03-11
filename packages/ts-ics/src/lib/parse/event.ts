import { COMMA, getAlarmRegex, replaceEventRegex } from "@/constants";
import { VEVENT_TO_OBJECT_KEYS, type VEventKey } from "@/constants/keys/event";
import { type VEvent, type DateObject, EventLinesToObject } from "@/types";
import type { Attendee } from "@/types/attendee";

import {
  objectKeyIsArrayOfStrings,
  objectKeyIsTextString,
  objectKeyIsTimeStamp,
} from "../../constants/keyTypes/event";
import { icsAlarmToObject } from "./alarm";
import { icsAttendeeToObject } from "./attendee";
import { icsDurationToObject } from "./duration";
import { icsOrganizerToObject } from "./organizer";
import { icsRecurrenceRuleToObject } from "./recurrenceRule";
import { icsTimeStampToObject } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { icsExceptionDateToObject } from "./exceptionDate";
import { unescapeTextString } from "./utils/unescapeText";
import { icsRecurrenceIdToObject } from "./recurrenceId";
import { icsClassStringToClass } from "./class";
import { icsStatusStringToStatus } from "./status";
import { icsTimeTransparentStringToTimeTransparent } from "./timeTransparent";
import { standardValidate } from "./utils/standardValidate";

export const icsEventToObject: EventLinesToObject = (
  schema,
  rawEventString,
  eventOptions
) => {
  const eventString = rawEventString.replace(replaceEventRegex, "");

  const lineStrings = splitLines(eventString.replace(getAlarmRegex, ""));

  const event: Partial<VEvent> = {};

  const attendees: Attendee[] = [];
  const exceptionDates: DateObject[] = [];

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<VEventKey>(lineString);

    const objectKey = VEVENT_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKeyIsTimeStamp(objectKey)) {
      event[objectKey] = icsTimeStampToObject(undefined, line, {
        timezones: eventOptions?.timezones,
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
      event[objectKey] = icsRecurrenceRuleToObject(undefined, line, {
        timezones: eventOptions?.timezones,
      });
      return;
    }

    if (objectKey === "duration") {
      event[objectKey] = icsDurationToObject(undefined, line);
      return;
    }

    if (objectKey === "organizer") {
      event[objectKey] = icsOrganizerToObject(undefined, line);
      return;
    }

    if (objectKey === "sequence") {
      event[objectKey] = Number(line.value);
      return;
    }

    if (objectKey === "attendee") {
      attendees.push(icsAttendeeToObject(undefined, line));
      return;
    }

    if (objectKey === "exceptionDates") {
      exceptionDates.push(
        ...icsExceptionDateToObject(undefined, line, {
          timezones: eventOptions?.timezones,
        })
      );
      return;
    }

    if (objectKey === "alarm") return;

    if (objectKey === "class") {
      event[objectKey] = icsClassStringToClass(undefined, line);
      return;
    }

    if (objectKey === "recurrenceId") {
      event[objectKey] = icsRecurrenceIdToObject(undefined, line, {
        timezones: eventOptions?.timezones,
      });
      return;
    }

    if (objectKey === "status") {
      event[objectKey] = icsStatusStringToStatus(undefined, line);
      return;
    }

    if (objectKey === "timeTransparent") {
      event[objectKey] = icsTimeTransparentStringToTimeTransparent(
        undefined,
        line
      );
      return;
    }

    event[objectKey] = line.value; // Set string value
  });

  const alarmStrings = [...rawEventString.matchAll(getAlarmRegex)].map(
    (match) => match[0]
  );

  if (alarmStrings.length > 0) {
    const alarms = alarmStrings.map((alarmString) =>
      icsAlarmToObject(undefined, alarmString, eventOptions)
    );

    event.alarms = alarms;
  }

  if (attendees.length > 0) {
    event.attendees = attendees;
  }

  if (exceptionDates.length > 0) {
    event.exceptionDates = exceptionDates;
  }

  return standardValidate(schema, event as VEvent);
};
