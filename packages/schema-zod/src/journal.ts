import {
  convertIcsJournal,
  type NonStandardValuesGeneric,
  type IcsJournal,
  type ParseJournal,
} from "ts-ics";
import { z } from "zod";
import { zIcsDateObject } from "./date";
import { zIcsExceptionDates } from "./exceptionDate";
import { zIcsAttendee } from "./attendee";
import { zIcsRecurrenceRule } from "./recurrenceRule";
import { zIcsClassType } from "./class";
import { zIcsOrganizer } from "./organizer";
import { zIcsJournalStatusType } from "./status";
import { zIcsRecurrenceId } from "./recurrenceId";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsJournal: z.ZodType<IcsJournal<any>> = z.object({
  summary: z.string().optional(),
  uid: z.string(),
  created: zIcsDateObject.optional(),
  lastModified: zIcsDateObject.optional(),
  completed: zIcsDateObject.optional(),
  start: zIcsDateObject.optional(),
  stamp: zIcsDateObject,
  location: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  exceptionDates: zIcsExceptionDates.optional(),
  recurrenceRule: zIcsRecurrenceRule.optional(),
  url: z.string().url().optional(),
  geo: z.string().optional(),
  class: zIcsClassType.optional(),
  organizer: zIcsOrganizer.optional(),
  priority: z.string().optional(),
  sequence: z.number().int().optional(),
  status: zIcsJournalStatusType.optional(),
  attach: z.string().optional(),
  recurrenceId: zIcsRecurrenceId.optional(),
  attendees: z.array(zIcsAttendee).optional(),
  comment: z.string().optional(),
  nonStandard: z.record(z.any()).optional(),
  percentComplete: z.number().int().optional(),
});

export const parseIcsJournal = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseJournal<T>>
): ReturnType<ParseJournal<T>> => convertIcsJournal(zIcsJournal, ...props);
