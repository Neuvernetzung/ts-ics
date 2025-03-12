import {
  icsAlarmToObject,
  type ParseAlarm,
  type VAlarm,
} from "ts-ics";
import { z } from "zod";
import { zVEventTrigger } from "./trigger";
import { zAttendee } from "./attendee";
import { zDuration } from "./duration";
import { zAttachment } from "./attachment";

export const zVAlarm: z.ZodType<VAlarm> = z.object({
  action: z.string().default("DISPLAY"),
  description: z.string().optional(),
  trigger: zVEventTrigger,
  attendees: z.array(zAttendee).optional(),
  duration: zDuration.optional(),
  repeat: z.number().optional(),
  summary: z.string().optional(),
  attachments: z.array(zAttachment).optional(),
});

export const parseIcsAlarm: ParseAlarm = (...props) =>
  icsAlarmToObject(zVAlarm, ...props);
