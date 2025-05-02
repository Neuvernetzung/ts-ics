import type { IcsJournal } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsJournalObjectKey = Exclude<keyof IcsJournal, "nonStandard">;

export type IcsJournalObjectKeys = IcsJournalObjectKey[];

export const VJOURNAL_TO_KEYS = {
  categories: "CATEGORIES",
  created: "CREATED",
  description: "DESCRIPTION",
  lastModified: "LAST-MODIFIED",
  exceptionDates: "EXDATE",
  recurrenceRule: "RRULE",
  stamp: "DTSTAMP",
  start: "DTSTART",
  summary: "SUMMARY",
  uid: "UID",
  url: "URL",
  geo: "GEO",
  class: "CLASS",
  organizer: "ORGANIZER",
  sequence: "SEQUENCE",
  status: "STATUS",
  attach: "ATTACH",
  recurrenceId: "RECURRENCE-ID",
  attendees: "ATTENDEE",
  comment: "COMMENT",
} as const satisfies Record<IcsJournalObjectKey, string>;

export const VJOURNAL_TO_OBJECT_KEYS = invertKeys(VJOURNAL_TO_KEYS);

export type IcsJournalKey = keyof typeof VJOURNAL_TO_OBJECT_KEYS;
export type IcsJournalKeys = IcsJournalKey[];

export const VJOURNAL_KEYS = keysFromObject(VJOURNAL_TO_OBJECT_KEYS);

export const VJOURNAL_OBJECT_KEYS = keysFromObject(VJOURNAL_TO_KEYS);
