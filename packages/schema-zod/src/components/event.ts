import {
  convertIcsEvent,
  type NonStandardValuesGeneric,
  type IcsEvent,
  type IcsEventBase,
  type IcsEventDurationOrEnd,
  type ParseEvent,
} from "ts-ics";
import { z } from "zod";
import { zIcsDateObject } from "../values/date";
import { zIcsExceptionDates } from "../values/exceptionDate";
import { zIcsAttendee } from "../values/attendee";
import { zIcsDuration } from "../values/duration";
import { zIcsRecurrenceRule } from "../values/recurrenceRule";
import { zIcsAlarm } from "./alarm";
import { zIcsTimeTransparentType } from "../values/timeTransparent";
import { zIcsClassType } from "../values/class";
import { zIcsOrganizer } from "../values/organizer";
import { zIcsEventStatusType } from "../values/status";
import { zIcsRecurrenceId } from "../values/recurrenceId";

export const zIcsDurationOrEnd: z.ZodType<
  IcsEventDurationOrEnd,
  IcsEventDurationOrEnd
> = z.union([
  z.object({ duration: zIcsDuration, end: z.never().optional() }),
  z.object({ duration: z.never().optional(), end: zIcsDateObject }),
]);

export const zIcsEventBase: z.ZodType<IcsEventBase, IcsEventBase> = z.object({
  summary: z.string(),
  uid: z.string(),
  created: zIcsDateObject.optional(),
  lastModified: zIcsDateObject.optional(),
  stamp: zIcsDateObject,
  start: zIcsDateObject,
  location: z.string().optional(),
  description: z.string().optional(),
  descriptionAltRep: z.string().optional(),
  categories: z.array(z.string()).optional(),
  exceptionDates: zIcsExceptionDates.optional(),
  recurrenceRule: zIcsRecurrenceRule.optional(),
  alarms: z.array(zIcsAlarm).optional(),
  timeTransparent: zIcsTimeTransparentType.optional(),
  url: z.url().optional(),
  geo: z.string().optional(),
  class: zIcsClassType.optional(),
  organizer: zIcsOrganizer.optional(),
  priority: z.string().optional(),
  sequence: z.number().int().optional(),
  status: zIcsEventStatusType.optional(),
  attach: z.string().optional(),
  recurrenceId: zIcsRecurrenceId.optional(),
  attendees: z.array(zIcsAttendee).optional(),
  comment: z.string().optional(),
  nonStandard: z.record(z.string(), z.any()).optional(),
});

export const zIcsEvent: z.ZodType<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsEvent<any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsEvent<any>
> = z.intersection(zIcsEventBase, zIcsDurationOrEnd);

export const parseIcsEvent = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseEvent<T>>
): ReturnType<ParseEvent<T>> => convertIcsEvent(zIcsEvent, ...props);
