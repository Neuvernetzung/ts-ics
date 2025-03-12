import type { IcsAlarm } from "@/types";

export const VALARM_KEYS = [
  "ACTION",
  "TRIGGER",
  "DURATION",
  "SUMMARY",
  "DESCRIPTION",
  "REPEAT",
  "ATTACH",
  "ATTENDEE",
] as const;
export type IcsAlarmKeys = typeof VALARM_KEYS;
export type IcsAlarmKey = IcsAlarmKeys[number];

export const VALARM_OBJECT_KEYS = [
  "action",
  "trigger",
  "duration",
  "summary",
  "description",
  "repeat",
  "attachments",
  "attendees",
] as const satisfies (keyof IcsAlarm)[];

export type IcsAlarmObjectKeys = typeof VALARM_OBJECT_KEYS;
export type IcsAlarmObjectKey = IcsAlarmObjectKeys[number];

export const VALARM_TO_OBJECT_KEYS: Record<IcsAlarmKey, IcsAlarmObjectKey> = {
  ACTION: "action",
  DESCRIPTION: "description",
  DURATION: "duration",
  REPEAT: "repeat",
  SUMMARY: "summary",
  TRIGGER: "trigger",
  ATTACH: "attachments",
  ATTENDEE: "attendees",
};

export const VALARM_TO_KEYS: Record<IcsAlarmObjectKey, IcsAlarmKey> = {
  action: "ACTION",
  description: "DESCRIPTION",
  duration: "DURATION",
  repeat: "REPEAT",
  summary: "SUMMARY",
  trigger: "TRIGGER",
  attachments: "ATTACH",
  attendees: "ATTENDEE",
};
