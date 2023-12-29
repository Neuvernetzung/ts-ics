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
export type VAlarmKeys = typeof VALARM_KEYS;
export type VAlarmKey = VAlarmKeys[number];

export const VALARM_OBJECT_KEYS = [
  "action",
  "trigger",
  "duration",
  "summary",
  "description",
  "repeat",
  "attachment",
  "attendee",
] as const;

export type VAlarmObjectKeys = typeof VALARM_OBJECT_KEYS;
export type VAlarmObjectKey = VAlarmObjectKeys[number];

export const VALARM_TO_OBJECT_KEYS: Record<VAlarmKey, VAlarmObjectKey> = {
  ACTION: "action",
  DESCRIPTION: "description",
  DURATION: "duration",
  REPEAT: "repeat",
  SUMMARY: "summary",
  TRIGGER: "trigger",
  ATTACH: "attachment",
  ATTENDEE: "attendee",
};

export const VALARM_TO_KEYS: Record<VAlarmObjectKey, VAlarmKey> = {
  action: "ACTION",
  description: "DESCRIPTION",
  duration: "DURATION",
  repeat: "REPEAT",
  summary: "SUMMARY",
  trigger: "TRIGGER",
  attachment: "ATTACH",
  attendee: "ATTENDEE",
};
