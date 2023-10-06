import { VEVENT_TO_KEYS } from "@/constants/keys/event";
import {
  objectKeyIsArrayOfStrings,
  objectKeyIsTimeStamp,
} from "@/constants/keyTypes";
import type {
  DateObject,
  VEvent,
  VEventDuration,
  VEventRecurrenceRule,
} from "@/types";
import { Organizer } from "@/types/organizer";

import { generateIcsAlarm } from "./alarm";
import { generateIcsAttendee } from "./attendee";
import { generateIcsDuration } from "./duration";
import { generateIcsOrganizer } from "./organizer";
import { generateIcsRecurrenceRule } from "./recurrenceRule";
import { generateIcsTimeStamp } from "./timeStamp";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "./utils/addLine";
import { getKeys } from "./utils/getKeys";

export const generateIcsEvent = (event: VEvent) => {
  const eventKeys = getKeys(event);

  let icsString = "";

  icsString += getIcsStartLine("VEVENT");

  eventKeys.forEach((key) => {
    if (key === "alarms" || key === "attendees") return;

    const icsKey = VEVENT_TO_KEYS[key];

    if (!icsKey) return;

    const value = event[key];

    if (value === undefined || value === null) return;

    if (objectKeyIsTimeStamp(key)) {
      icsString += generateIcsTimeStamp(icsKey, value as DateObject);
      return;
    }

    if (objectKeyIsArrayOfStrings(key)) {
      icsString += generateIcsLine(icsKey, (value as string[]).join(","));
      return;
    }

    if (key === "recurrenceRule") {
      icsString += generateIcsRecurrenceRule(value as VEventRecurrenceRule);
      return;
    }

    if (key === "duration") {
      icsString += generateIcsLine(
        icsKey,
        generateIcsDuration(value as VEventDuration)
      );
      return;
    }

    if (key === "organizer") {
      icsString += generateIcsOrganizer(value as Organizer);
      return;
    }

    if (key === "sequence") {
      icsString += (value as number).toString();
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (event.alarms && event.alarms.length > 0) {
    event.alarms.forEach((alarm) => {
      icsString += generateIcsAlarm(alarm);
    });
  }

  if (event.attendees && event.attendees.length > 0) {
    event.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  icsString += getIcsEndLine("VEVENT");

  return icsString;
};
