import {
  convertIcsTodo,
  type NonStandardValuesGeneric,
  type IcsTodo,
  type IcsTodoBase,
  type IcsTodoDurationOrDue,
  type ParseTodo,
} from "ts-ics";
import { z } from "zod";
import { zIcsDateObject } from "./date";
import { zIcsExceptionDates } from "./exceptionDate";
import { zIcsAttendee } from "./attendee";
import { zIcsDuration } from "./duration";
import { zIcsRecurrenceRule } from "./recurrenceRule";
import { zIcsClassType } from "./class";
import { zIcsOrganizer } from "./organizer";
import { zIcsTodoStatusType } from "./status";
import { zIcsRecurrenceId } from "./recurrenceId";

export const zIcsDurationOrDue: z.ZodType<IcsTodoDurationOrDue> = z.union([
  z.object({
    duration: zIcsDuration,
    start: zIcsDateObject,
    due: z.never().optional(),
  }),
  z.object({ duration: z.never().optional(), due: zIcsDateObject }),
]);

export const zIcsTodoBase: z.ZodType<IcsTodoBase> = z.object({
  summary: z.string().optional(),
  uid: z.string(),
  created: zIcsDateObject.optional(),
  lastModified: zIcsDateObject.optional(),
  completed: zIcsDateObject.optional(),
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
  status: zIcsTodoStatusType.optional(),
  attach: z.string().optional(),
  recurrenceId: zIcsRecurrenceId.optional(),
  attendees: z.array(zIcsAttendee).optional(),
  comment: z.string().optional(),
  nonStandard: z.record(z.any()).optional(),
  percentComplete: z.number().int().optional(),
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsTodo: z.ZodType<IcsTodo<any>> = z.intersection(
  zIcsTodoBase,
  zIcsDurationOrDue
);

export const parseIcsTodo = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseTodo<T>>
): ReturnType<ParseTodo<T>> => convertIcsTodo(zIcsTodo, ...props);
