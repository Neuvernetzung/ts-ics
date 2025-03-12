import { replaceAlarmRegex } from "@/constants";
import {
  VALARM_TO_OBJECT_KEYS,
  type IcsAlarmKey,
} from "@/constants/keys/alarm";
import type { ConvertAlarm, IcsAlarm } from "@/types";
import type { IcsAttachment } from "@/types/attachment";
import type { IcsAttendee } from "@/types/attendee";

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
): IcsAlarm => {
  const alarmString = rawAlarmString.replace(replaceAlarmRegex, "");

  const lineStrings = splitLines(alarmString);

  const alarm: Partial<IcsAlarm> = {};

  const attachments: IcsAttachment[] = [];

  const attendees: IcsAttendee[] = [];

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsAlarmKey>(lineString);

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

  return standardValidate(schema, alarm as IcsAlarm);
};
