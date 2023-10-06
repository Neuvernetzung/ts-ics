import set from "lodash/set";

import { replaceAlarmRegex } from "@/constants";
import {
  VALARM_KEYS,
  VALARM_TO_OBJECT_KEYS,
  VAlarmKey,
} from "@/constants/keys/alarm";
import { VAlarm, zVAlarm } from "@/types";
import type { Attachment } from "@/types/attachment";
import { Attendee } from "@/types/attendee";

import { icsAttachmentToObject } from "./attachment";
import { icsAttendeeToObject } from "./attendee";
import { icsDurationToObject } from "./duration";
import { icsTriggerToObject } from "./trigger";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";

export const icsAlarmToObject = (rawAlarmString: string): VAlarm => {
  const alarmString = rawAlarmString.replace(replaceAlarmRegex, "");

  const lines = splitLines(VALARM_KEYS, alarmString);

  const alarm = {};

  const attachments: Attachment[] = [];

  const attendees: Attendee[] = [];

  lines.forEach((line) => {
    const { property, options, value } = getLine<VAlarmKey>(line);

    const objectKey = VALARM_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "trigger") {
      set(alarm, objectKey, icsTriggerToObject(value, options));
      return;
    }

    if (objectKey === "duration") {
      set(alarm, objectKey, icsDurationToObject(value));
      return;
    }

    if (objectKey === "repeat") {
      set(alarm, objectKey, Number(value));
      return;
    }

    if (objectKey === "attachment") {
      attachments.push(icsAttachmentToObject(value, options));
      return;
    }

    if (objectKey === "attendee") {
      attendees.push(icsAttendeeToObject(value, options));
      return;
    }

    set(alarm, objectKey, value); // Set string value
  });

  if (attachments.length > 0) {
    set(alarm, "attachments", attachments);
  }

  if (attendees.length > 0) {
    set(alarm, "attendees", attendees);
  }

  return alarm as VAlarm;
};

export const parseIcsAlarm = (rawAlarmString: string): VAlarm =>
  zVAlarm.parse(icsAlarmToObject(rawAlarmString));
