import { VALARM_TO_KEYS } from "@/constants/keys/alarm";
import type { VAlarm, VEventDuration, VEventTrigger } from "@/types";

import { generateIcsAttachment } from "./attachment";
import { generateIcsAttendee } from "./attendee";
import { generateIcsDuration } from "./duration";
import { generateIcsTrigger } from "./trigger";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "./utils/addLine";
import { getKeys } from "./utils/getKeys";

export const generateIcsAlarm = (alarm: VAlarm) => {
  const alarmKeys = getKeys(alarm);

  let icsString = "";

  icsString += getIcsStartLine("VALARM");

  alarmKeys.forEach((key) => {
    if (key === "attachments" || key === "attendees") return;

    const icsKey = VALARM_TO_KEYS[key];

    if (!icsKey) return;

    const value = alarm[key];

    if (!value) return;

    if (value === undefined || value === null) return;

    if (key === "trigger") {
      icsString += generateIcsTrigger(value as VEventTrigger);
      return;
    }

    if (key === "duration") {
      icsString += generateIcsLine(
        icsKey,
        generateIcsDuration(value as VEventDuration)
      );
      return;
    }

    if (key === "repeat") {
      icsString += generateIcsLine(icsKey, value?.toString());
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (alarm.attachments && alarm.attachments.length > 0) {
    alarm.attachments.forEach((attachment) => {
      icsString += generateIcsAttachment(attachment);
    });
  }

  if (alarm.attendees && alarm.attendees.length > 0) {
    alarm.attendees.forEach((attendee) => {
      icsString += generateIcsAttendee(attendee, "ATTENDEE");
    });
  }

  icsString += getIcsEndLine("VALARM");

  return icsString;
};
