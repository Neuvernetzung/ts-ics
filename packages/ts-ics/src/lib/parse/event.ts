import { COMMA, getAlarmRegex, replaceEventRegex } from "@/constants";
import { VEVENT_TO_OBJECT_KEYS, type VEventKey } from "@/constants/keys/event";
import { type VEvent, type VTimezone, type DateObject } from "@/types";
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

export type ParseIcsEvent = (
  rawEventString: string,
  timezones?: VTimezone[]
) => VEvent;

export const icsEventToObject: ParseIcsEvent = (rawEventString, timezones) => {
  const eventString = rawEventString.replace(replaceEventRegex, "");

  const lines = splitLines(eventString.replace(getAlarmRegex, ""));

  const event: Partial<VEvent> = {};

  const attendees: Attendee[] = [];
  const exceptionDates: DateObject[] = [];

  lines.forEach((line) => {
    const { property, options, value } = getLine<VEventKey>(line);

    const objectKey = VEVENT_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKeyIsTimeStamp(objectKey)) {
      event[objectKey] = icsTimeStampToObject(value, options, timezones);
      return;
    }

    if (objectKeyIsArrayOfStrings(objectKey)) {
      event[objectKey] = value.split(COMMA);

      return;
    }

    if (objectKeyIsTextString(objectKey)) {
      event[objectKey] = unescapeTextString(value);
      return;
    }

    if (objectKey === "recurrenceRule") {
      event[objectKey] = icsRecurrenceRuleToObject(value, timezones);
      return;
    }

    if (objectKey === "duration") {
      event[objectKey] = icsDurationToObject(value);
      return;
    }

    if (objectKey === "organizer") {
      event[objectKey] = icsOrganizerToObject(value, options);
      return;
    }

    if (objectKey === "sequence") {
      event[objectKey] = Number(value);
      return;
    }

    if (objectKey === "attendee") {
      attendees.push(icsAttendeeToObject(value, options));
      return;
    }

    if (objectKey === "exceptionDates") {
      exceptionDates.push(...icsExceptionDateToObject(value, options));
      return;
    }

    if (objectKey === "alarm") return;

    if (objectKey === "class") {
      event[objectKey] = icsClassStringToClass(value);
      return;
    }

    if (objectKey === "recurrenceId") {
      event[objectKey] = icsRecurrenceIdToObject(value);
      return;
    }

    if (objectKey === "status") {
      event[objectKey] = icsStatusStringToStatus(value);
      return;
    }

    if (objectKey === "timeTransparent") {
      event[objectKey] = icsTimeTransparentStringToTimeTransparent(value);
      return;
    }

    event[objectKey] = value; // Set string value
  });

  const alarmStrings = [...rawEventString.matchAll(getAlarmRegex)].map(
    (match) => match[0]
  );

  if (alarmStrings.length > 0) {
    const alarms = alarmStrings.map((alarmString) =>
      icsAlarmToObject(alarmString, timezones)
    );

    event.alarms = alarms;
  }

  if (attendees.length > 0) {
    event.attendees = attendees;
  }

  if (exceptionDates.length > 0) {
    event.exceptionDates = exceptionDates;
  }

  return event as VEvent;
};
