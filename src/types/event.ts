import { z } from "zod";

import { type VAlarm, zVAlarm } from "./alarm";
import { type Attendee, zAttendee } from "./attendee";
import { type DateObject, zDateObject } from "./date";
import { type VEventDuration, zVEventDuration } from "./duration";
import { type Organizer, zOrganizer } from "./organizer";
import { type VEventRecurrenceRule, zVEventRecurrenceRule } from "./recurrence";
import { type RecurrenceId, zRecurrenceId } from "./recurrenceId";
import { type StatusType, statusTypes } from "./status";

export const timeTransparentTypes = ["TRANSPARENT", "OPAQUE"] as const;

export type TimeTransparentTypes = typeof timeTransparentTypes;
export type TimeTransparentType = TimeTransparentTypes[number];

export const classTypes = ["PRIVATE", "PUBLIC", "CONFIDENTIAL"] as const;

export type ClassTypes = typeof classTypes;
export type ClassType = ClassTypes[number];

export type VEventDurationOrEnd =
  | { duration: VEventDuration; end?: never }
  | { duration?: never; end: DateObject };

export const zVEventDurationOrEnd: z.ZodType<VEventDurationOrEnd> = z.union([
  z.object({ duration: zVEventDuration, end: z.never().optional() }),
  z.object({ duration: z.never().optional(), end: zDateObject }),
]);

export type VEventBase = {
  summary: string;
  uid: string;
  created?: DateObject;
  lastModified?: DateObject;
  stamp: DateObject;
  start: DateObject;
  location?: string;
  description?: string;
  categories?: string[];
  recurrenceRule?: VEventRecurrenceRule;
  alarms?: VAlarm[];
  timeTransparent?: TimeTransparentType;
  url?: string;
  geo?: string;
  class?: ClassType;
  organizer?: Organizer;
  priority?: string;
  sequence?: number;
  status?: StatusType;
  attach?: string;
  recurrenceId?: RecurrenceId;
  attendees?: Attendee[];
  comment?: string;
};

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
  recurrenceRule: zVEventRecurrenceRule.optional(),
  alarms: z.array(zVAlarm).optional(),
  timeTransparent: z.enum(timeTransparentTypes).optional(),
  url: z.string().url().optional(),
  geo: z.string().optional(),
  class: z.enum(classTypes).optional(),
  organizer: zOrganizer.optional(),
  priority: z.string().optional(),
  sequence: z.number().optional(),
  status: z.enum(statusTypes).optional(),
  attach: z.string().optional(),
  recurrenceId: zRecurrenceId.optional(),
  attendees: z.array(zAttendee).optional(),
  comment: z.string().optional(),
});

export type VEvent = VEventBase & VEventDurationOrEnd;

export const zVEvent: z.ZodType<VEvent> = z.intersection(
  zVEventBase,
  zVEventDurationOrEnd,
);
