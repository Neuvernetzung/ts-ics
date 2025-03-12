import { IcsTimezoneProp } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsTimezonePropObjectKey = Exclude<keyof IcsTimezoneProp, "type">;
export type IcsTimezonePropObjectKeys = IcsTimezonePropObjectKey[];

export const VTIMEZONE_PROP_TO_KEYS = {
  comment: "COMMENT",
  name: "TZNAME",
  offsetFrom: "TZOFFSETFROM",
  offsetTo: "TZOFFSETTO",
  recurrenceDate: "RDATE",
  recurrenceRule: "RRULE",
  start: "DTSTART",
} as const satisfies Record<IcsTimezonePropObjectKey, string>;

export const VTIMEZONE_PROP_TO_OBJECT_KEYS = invertKeys(VTIMEZONE_PROP_TO_KEYS);

export type IcsTimezonePropKey = keyof typeof VTIMEZONE_PROP_TO_OBJECT_KEYS;
export type IcsTimezonePropKeys = IcsTimezonePropKey[];

export const VTIMEZONE_PROP_KEYS = keysFromObject(
  VTIMEZONE_PROP_TO_OBJECT_KEYS
);

export const VTIMEZONE_PROP_OBJECT_KEYS = keysFromObject(
  VTIMEZONE_PROP_TO_KEYS
);
