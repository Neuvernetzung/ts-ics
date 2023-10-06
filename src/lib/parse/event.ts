import set from "lodash/set";

import { COMMA, getAlarmRegex, replaceEventRegex } from "@/constants";
import {
  VEVENT_KEYS,
  VEVENT_TO_OBJECT_KEYS,
  VEventKey,
} from "@/constants/keys/event";
import { VEvent, zVEvent } from "@/types";
import type { Attendee } from "@/types/attendee";

import { icsAlarmToObject } from "./alarm";
import { icsAttendeeToObject } from "./attendee";
import { icsDurationToObject } from "./duration";
import { icsOrganizerToObject } from "./organizer";
import { icsRecurrenceRuleToObject } from "./recurrenceRule";
import { icsTimeStampToObject } from "./timeStamp";
import {
  objectKeyIsArrayOfStrings,
  objectKeyIsTimeStamp,
} from "../../constants/keyTypes/event";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";

export const icsEventToObject = (rawEventString: string): VEvent => {
  const eventString = rawEventString.replace(replaceEventRegex, "");

  const lines = splitLines(VEVENT_KEYS, eventString.replace(getAlarmRegex, ""));

  const event = {};

  const attendees: Attendee[] = [];

  lines.forEach((line) => {
    const { property, options, value } = getLine<VEventKey>(line);

    const objectKey = VEVENT_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKeyIsTimeStamp(objectKey)) {
      set(event, objectKey, icsTimeStampToObject(value, options));
      return;
    }

    if (objectKeyIsArrayOfStrings(objectKey)) {
      set(event, objectKey, value.split(COMMA));
      return;
    }

    if (objectKey === "recurrenceRule") {
      set(event, objectKey, icsRecurrenceRuleToObject(value));
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

    set(event, objectKey, value); // Set string value
  });

  const alarmStrings = [...rawEventString.matchAll(getAlarmRegex)].map(
    (match) => match[0]
  );

  if (alarmStrings.length > 0) {
    const alarms = alarmStrings.map((alarmString) =>
      icsAlarmToObject(alarmString)
    );
    set(event, "alarms", alarms);
  }

  if (attendees.length > 0) {
    set(event, "attendees", attendees);
  }

  return event as VEvent;
};

export const parseIcsEvent = (file: string) =>
  zVEvent.parse(icsEventToObject(file));
