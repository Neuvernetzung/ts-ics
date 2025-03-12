import type { IcsAlarm } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsAlarmObjectKey = keyof IcsAlarm;
export type IcsAlarmObjectKeys = IcsAlarmObjectKey[];

export const VALARM_TO_KEYS = {
  action: "ACTION",
  description: "DESCRIPTION",
  duration: "DURATION",
  repeat: "REPEAT",
  summary: "SUMMARY",
  trigger: "TRIGGER",
  attachments: "ATTACH",
  attendees: "ATTENDEE",
} as const satisfies Record<IcsAlarmObjectKey, string>;

export const VALARM_TO_OBJECT_KEYS = invertKeys(VALARM_TO_KEYS);

export type IcsAlarmKey = keyof typeof VALARM_TO_OBJECT_KEYS;
export type IcsAlarmKeys = IcsAlarmKey[];

export const VALARM_KEYS = keysFromObject(VALARM_TO_OBJECT_KEYS);

export const VALARM_OBJECT_KEYS = keysFromObject(VALARM_TO_KEYS);
