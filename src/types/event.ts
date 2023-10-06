import { z } from "zod";

import { zVAlarm } from "./alarm";
import { zAttendee } from "./attendee";
import { zDateObject } from "./date";
import { zVEventDuration } from "./duration";
import { zOrganizer } from "./organizer";
import { zVEventRecurrenceRule } from "./recurrence";
import { zRecurrenceId } from "./recurrenceId";

export type VEventDurationOrEnd = z.infer<typeof zVEventDurationOrEnd>;

export const zVEventDurationOrEnd = z.union([
  z.object({ duration: zVEventDuration, end: z.never().optional() }),
  z.object({ duration: z.never().optional(), end: zDateObject }),
]);

export type VEventBase = z.infer<typeof zVEventBase>;

export const zVEventBase = z.object({
  summary: z.string(),
  uid: z.string(),
  created: zDateObject.default({ date: new Date() }),
  lastModified: zDateObject.default({ date: new Date() }),
  stamp: zDateObject.default({ date: new Date() }),
  start: zDateObject,
  location: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  recurrenceRule: zVEventRecurrenceRule.optional(),
  alarms: z.array(zVAlarm).optional(),
  timeTransparent: z.enum(["TRANSPARENT", "OPAQUE"]).optional(),
  url: z.string().url().optional(),
  geo: z.string().optional(),
  class: z.enum(["PRIVATE", "PUBLIC", "CONFIDENTIAL"]).optional(),
  organizer: zOrganizer.optional(),
  priority: z.string().optional(),
  sequence: z.number().optional(),
  status: z.enum(["TENTATIVE", "CONFIRMED", "CANCELLED"]).optional(),
  attach: z.string().optional(),
  recurrenceId: zRecurrenceId.optional(),
  attendees: z.array(zAttendee).optional(),
  comment: z.string().optional(),
});

export type VEvent = z.infer<typeof zVEvent>;

export const zVEvent = z.intersection(zVEventBase, zVEventDurationOrEnd);
