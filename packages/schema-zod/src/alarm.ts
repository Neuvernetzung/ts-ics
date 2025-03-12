import { convertIcsAlarm, type ParseAlarm, type VAlarm } from "ts-ics";
import { z } from "zod";
import { zTrigger } from "./trigger";
import { zAttendee } from "./attendee";
import { zDuration } from "./duration";
import { zAttachment } from "./attachment";

export const zVAlarm: z.ZodType<VAlarm> = z.object({
  action: z.string().default("DISPLAY"),
  description: z.string().optional(),
  trigger: zTrigger,
  attendees: z.array(zAttendee).optional(),
  duration: zDuration.optional(),
  repeat: z.number().optional(),
  summary: z.string().optional(),
  attachments: z.array(zAttachment).optional(),
});

export const parseIcsAlarm: ParseAlarm = (...props) =>
  convertIcsAlarm(zVAlarm, ...props);
