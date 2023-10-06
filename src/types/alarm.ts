import { z } from "zod";

import { zAttachment } from "./attachment";
import { zAttendee } from "./attendee";
import { zVEventDuration } from "./duration";
import { zVEventTrigger } from "./trigger";

export type VAlarm = z.infer<typeof zVAlarm>;

export const zVAlarm = z.object({
  action: z.string().default("DISPLAY"),
  description: z.string().optional(),
  trigger: zVEventTrigger,
  attendees: z.array(zAttendee).optional(),
  duration: zVEventDuration.optional(),
  repeat: z.number().optional(),
  summary: z.string().optional(),
  attachments: z.array(zAttachment).optional(),
});
