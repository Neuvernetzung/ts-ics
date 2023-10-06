import set from "lodash/set";

import { replaceAlarmRegex } from "@/constants";
import {
  VALARM_KEYS,
  VALARM_TO_OBJECT_KEYS,
  VAlarmKey,
} from "@/constants/keys/alarm";
import { zVAlarm } from "@/types";
import type { Attachment } from "@/types/attachment";

import { icsAttachmentToObject } from "./attachment";
import { icsDurationToObject } from "./duration";
import { icsTriggerToObject } from "./trigger";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { Attendee } from "@/types/attendee";
import { icsAttendeeToObject } from "./attendee";

export const icsAlarmToObject = (rawAlarmString: string) => {
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

  return alarm;
};

export const parseIcsAlarm = (rawAlarmString: string) =>
  zVAlarm.parse(icsAlarmToObject(rawAlarmString));
