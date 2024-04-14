import { z } from "zod";

import { type Attachment, zAttachment } from "./attachment";
import { type Attendee, zAttendee } from "./attendee";
import { type VEventDuration, zVEventDuration } from "./duration";
import { type VEventTrigger, zVEventTrigger } from "./trigger";

export type VAlarm = {
  action?: string;
  description?: string;
  trigger: VEventTrigger;
  attendees?: Attendee[];
  duration?: VEventDuration;
  repeat?: number;
  summary?: string;
  attachments?: Attachment[];
};

export const zVAlarm: z.ZodType<VAlarm> = z.object({
  action: z.string().default("DISPLAY"),
  description: z.string().optional(),
  trigger: zVEventTrigger,
  attendees: z.array(zAttendee).optional(),
  duration: zVEventDuration.optional(),
  repeat: z.number().optional(),
  summary: z.string().optional(),
  attachments: z.array(zAttachment).optional(),
});
