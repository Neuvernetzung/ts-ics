import { IcsEvent } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsEventObjectKey = keyof IcsEvent;

export type IcsEventObjectKeys = IcsEventObjectKey[];

export const VEVENT_TO_KEYS = {
  alarms: "ALARM",
  categories: "CATEGORIES",
  created: "CREATED",
  description: "DESCRIPTION",
  lastModified: "LAST-MODIFIED",
  location: "LOCATION",
  exceptionDates: "EXDATE",
  recurrenceRule: "RRULE",
  stamp: "DTSTAMP",
  start: "DTSTART",
  summary: "SUMMARY",
  uid: "UID",
  timeTransparent: "TRANSP",
  url: "URL",
  end: "DTEND",
  duration: "DURATION",
  geo: "GEO",
  class: "CLASS",
  organizer: "ORGANIZER",
  priority: "PRIORITY",
  sequence: "SEQUENCE",
  status: "STATUS",
  attach: "ATTACH",
  recurrenceId: "RECURRENCE-ID",
  attendees: "ATTENDEE",
  comment: "COMMENT",
} as const satisfies Record<IcsEventObjectKey, string>;

export const VEVENT_TO_OBJECT_KEYS = invertKeys(VEVENT_TO_KEYS);

export type IcsEventKey = keyof typeof VEVENT_TO_OBJECT_KEYS;
export type IcsEventKeys = IcsEventKey[];

export const VEVENT_KEYS = keysFromObject(VEVENT_TO_OBJECT_KEYS);

export const VEVENT_OBJECT_KEYS = keysFromObject(VEVENT_TO_KEYS);
