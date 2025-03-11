import { replaceAlarmRegex } from "@/constants";
import { VALARM_TO_OBJECT_KEYS, type VAlarmKey } from "@/constants/keys/alarm";
import { type VAlarm, type VTimezone } from "@/types";
import type { Attachment } from "@/types/attachment";
import type { Attendee } from "@/types/attendee";

import { icsAttachmentToObject } from "./attachment";
import { icsAttendeeToObject } from "./attendee";
import { icsDurationToObject } from "./duration";
import { icsTriggerToObject } from "./trigger";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export type ParseAlarmOptions = {
  timezones?: VTimezone[];
};

export const icsAlarmToObject = (
  rawAlarmString: string,
  schema: StandardSchemaV1<VAlarm> | undefined,
  alarmOptions?: ParseAlarmOptions
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
      alarm[objectKey] = icsTriggerToObject(line, undefined, {
        timezones: alarmOptions?.timezones,
      });
      return;
    }

    if (objectKey === "duration") {
      alarm[objectKey] = icsDurationToObject(line, undefined);
      return;
    }

    if (objectKey === "repeat") {
      alarm[objectKey] = Number(line.value);
      return;
    }

    if (objectKey === "attachment") {
      attachments.push(icsAttachmentToObject(line, undefined));
      return;
    }

    if (objectKey === "attendee") {
      attendees.push(icsAttendeeToObject(line, undefined));
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
