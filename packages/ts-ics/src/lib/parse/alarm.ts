import { replaceAlarmRegex } from "@/constants";
import {
  VALARM_TO_OBJECT_KEYS,
  type IcsAlarmKey,
} from "@/constants/keys/alarm";
import type { ConvertAlarm, IcsAlarm, Line } from "@/types";
import type { IcsAttachment } from "@/types/attachment";
import type { IcsAttendee } from "@/types/attendee";

import { convertIcsAttachment } from "./attachment";
import { convertIcsAttendee } from "./attendee";
import { convertIcsDuration } from "./duration";
import { convertIcsTrigger } from "./trigger";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsAlarm = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertAlarm<T>>
): ReturnType<ConvertAlarm<T>> => {
  const [schema, rawAlarmString, options] = args;

  const alarmString = rawAlarmString.replace(replaceAlarmRegex, "");

  const lineStrings = splitLines(alarmString);

  const alarm: Partial<IcsAlarm> = {};

  const attachments: IcsAttachment[] = [];

  const attendees: IcsAttendee[] = [];

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsAlarmKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VALARM_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "trigger") {
      alarm[objectKey] = convertIcsTrigger(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "duration") {
      alarm[objectKey] = convertIcsDuration(undefined, line);
      return;
    }

    if (objectKey === "repeat") {
      alarm[objectKey] = Number.parseInt(line.value);
      return;
    }

    if (objectKey === "attachments") {
      attachments.push(convertIcsAttachment(undefined, line));
      return;
    }

    if (objectKey === "attendees") {
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

  const validatedAlarm = standardValidate(schema, alarm as IcsAlarm<T>);

  if (!options?.nonStandard) return validatedAlarm;

  return convertNonStandardValues(
    validatedAlarm,
    nonStandardValues,
    options?.nonStandard
  );
};
