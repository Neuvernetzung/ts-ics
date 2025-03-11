import {
  icsEventToObject,
  VEvent,
  VEventBase,
  DurationOrEnd,
  ParseEvent,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";
import { zExceptionDates } from "./exceptionDate";
import { zAttendee } from "./attendee";
import { zDuration } from "./duration";
import { zRecurrenceRule } from "./recurrenceRule";
import { zVAlarm } from "./alarm";
import { zTimeTransparentType } from "./timeTransparent";
import { zClassType } from "./class";
import { zOrganizer } from "./organizer";
import { zStatusType } from "./status";
import { zRecurrenceId } from "./recurrenceId";

export const zDurationOrEnd: z.ZodType<DurationOrEnd> = z.union([
  z.object({ duration: zDuration, end: z.never().optional() }),
  z.object({ duration: z.never().optional(), end: zDateObject }),
]);

export const zVEventBase: z.ZodType<VEventBase> = z.object({
  summary: z.string(),
  uid: z.string(),
  created: zDateObject.optional(),
  lastModified: zDateObject.optional(),
  stamp: zDateObject,
  start: zDateObject,
  location: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  exceptionDates: zExceptionDates.optional(),
  recurrenceRule: zRecurrenceRule.optional(),
  alarms: z.array(zVAlarm).optional(),
  timeTransparent: zTimeTransparentType.optional(),
  url: z.string().url().optional(),
  geo: z.string().optional(),
  class: zClassType.optional(),
  organizer: zOrganizer.optional(),
  priority: z.string().optional(),
  sequence: z.number().optional(),
  status: zStatusType.optional(),
  attach: z.string().optional(),
  recurrenceId: zRecurrenceId.optional(),
  attendees: z.array(zAttendee).optional(),
  comment: z.string().optional(),
});

export const zVEvent: z.ZodType<VEvent> = z.intersection(
  zVEventBase,
  zDurationOrEnd
);

export const parseIcsEvent: ParseEvent = (...props) =>
  icsEventToObject(zVEvent, ...props);
