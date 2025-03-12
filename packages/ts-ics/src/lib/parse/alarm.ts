import { replaceAlarmRegex } from "@/constants";
import { VALARM_TO_OBJECT_KEYS, type VAlarmKey } from "@/constants/keys/alarm";
import type { ConvertAlarm, VAlarm } from "@/types";
import type { Attachment } from "@/types/attachment";
import type { Attendee } from "@/types/attendee";

import { convertIcsAttachment } from "./attachment";
import { convertIcsAttendee } from "./attendee";
import { convertIcsDuration } from "./duration";
import { convertIcsTrigger } from "./trigger";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsAlarm: ConvertAlarm = (
  schema,
  rawAlarmString,
  alarmOptions
): VAlarm => {
  const alarmString = rawAlarmString.replace(replaceAlarmRegex, "");

  const lineStrings = splitLines(alarmString);

  const alarm: Partial<VAlarm> = {};

  const attachments: Attachment[] = [];

  const attendees: Attendee[] = [];

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<VAlarmKey>(lineString);

    const objectKey = VALARM_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "trigger") {
      alarm[objectKey] = convertIcsTrigger(undefined, line, {
        timezones: alarmOptions?.timezones,
      });
      return;
    }

    if (objectKey === "duration") {
      alarm[objectKey] = convertIcsDuration(undefined, line);
      return;
    }

    if (objectKey === "repeat") {
      alarm[objectKey] = Number(line.value);
      return;
    }

    if (objectKey === "attachment") {
      attachments.push(convertIcsAttachment(undefined, line));
      return;
    }

    if (objectKey === "attendee") {
      attendees.push(convertIcsAttendee(undefined, line));
      return;
    }

    alarm[objectKey] = line.value; // Set string value
  });

  if (attachments.length > 0) {
    alarm.attachments = attachments;
  }

  if (attendees.length > 0) {
    alarm.attendees = attendees;
  }

  return standardValidate(schema, alarm as VAlarm);
};
