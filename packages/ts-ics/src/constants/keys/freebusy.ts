import type { IcsFreeBusy } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsFreeBusyObjectKey = Exclude<keyof IcsFreeBusy, "nonStandard">;

export type IcsFreeBusyObjectKeys = IcsFreeBusyObjectKey[];

export const VFREEBUSY_TO_KEYS = {
  stamp: "DTSTAMP",
  start: "DTSTART",
  uid: "UID",
  url: "URL",
  organizer: "ORGANIZER",
  attendees: "ATTENDEE",
  comment: "COMMENT",
  end: "DTEND",
  freeBusy: "FREEBUSY",
} as const satisfies Record<IcsFreeBusyObjectKey, string>;

export const VFREEBUSY_TO_OBJECT_KEYS = invertKeys(VFREEBUSY_TO_KEYS);

export type IcsFreeBusyKey = keyof typeof VFREEBUSY_TO_OBJECT_KEYS;
export type IcsFreeBusyKeys = IcsFreeBusyKey[];

export const VFREEBUSY_KEYS = keysFromObject(VFREEBUSY_TO_OBJECT_KEYS);

export const VFREEBUSY_OBJECT_KEYS = keysFromObject(VFREEBUSY_TO_KEYS);
