import set from "lodash/set";

import { COMMA, getAlarmRegex, replaceEventRegex } from "@/constants";
import { VEVENT_TO_OBJECT_KEYS, type VEventKey } from "@/constants/keys/event";
import { type VEvent, type VTimezone, zVEvent, type DateObject } from "@/types";
import type { Attendee } from "@/types/attendee";

import {
  objectKeyIsArrayOfStrings,
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

export type ParseIcsEvent = (
  rawEventString: string,
  timezones?: VTimezone[]
) => VEvent;

export const icsEventToObject: ParseIcsEvent = (rawEventString, timezones) => {
  const eventString = rawEventString.replace(replaceEventRegex, "");

  const lines = splitLines(eventString.replace(getAlarmRegex, ""));

  const event = {};

  const attendees: Attendee[] = [];
  const exceptionDates: DateObject[] = [];

  lines.forEach((line) => {
    const { property, options, value } = getLine<VEventKey>(line);

    const objectKey = VEVENT_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKeyIsTimeStamp(objectKey)) {
      set(event, objectKey, icsTimeStampToObject(value, options, timezones));
      return;
    }

    if (objectKeyIsArrayOfStrings(objectKey)) {
      set(event, objectKey, value.split(COMMA));
      return;
    }

    if (objectKey === "recurrenceRule") {
      set(event, objectKey, icsRecurrenceRuleToObject(value, timezones));
      return;
    }

    if (objectKey === "duration") {
      set(event, objectKey, icsDurationToObject(value));
      return;
    }

    if (objectKey === "organizer") {
      set(event, objectKey, icsOrganizerToObject(value, options));
      return;
    }

    if (objectKey === "sequence") {
      set(event, objectKey, Number(value));
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

    set(event, objectKey, value); // Set string value
  });

  const alarmStrings = [...rawEventString.matchAll(getAlarmRegex)].map(
    (match) => match[0]
  );

  if (alarmStrings.length > 0) {
    const alarms = alarmStrings.map((alarmString) =>
      icsAlarmToObject(alarmString, timezones)
    );
    set(event, "alarms", alarms);
  }

  if (attendees.length > 0) {
    set(event, "attendees", attendees);
  }

  if (exceptionDates.length > 0) {
    set(event, "exceptionDates", exceptionDates);
  }

  return event as VEvent;
};

export const parseIcsEvent: ParseIcsEvent = (file, timezones) =>
  zVEvent.parse(icsEventToObject(file, timezones));
