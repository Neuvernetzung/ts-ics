import { IcsTimezone } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsTimezoneObjectKey = Exclude<
  keyof IcsTimezone,
  "props" | "nonStandard"
>;
export type IcsTimezoneObjectKeys = IcsTimezoneObjectKey[];

export const VTIMEZONE_TO_KEYS = {
  id: "TZID",
  lastModified: "LAST-MODIFIED",
  url: "TZURL",
} as const satisfies Record<IcsTimezoneObjectKey, string>;

export const VTIMEZONE_TO_OBJECT_KEYS = invertKeys(VTIMEZONE_TO_KEYS);

export type IcsTimezoneKey = keyof typeof VTIMEZONE_TO_OBJECT_KEYS;
export type IcsTimezoneKeys = IcsTimezoneKey[];

export const VTIMEZONE_KEYS = keysFromObject(VTIMEZONE_TO_OBJECT_KEYS);

export const VTIMEZONE_OBJECT_KEYS = keysFromObject(VTIMEZONE_TO_KEYS);
