import {
  convertIcsAlarm,
  type ParseAlarm,
  type IcsAlarm,
  type NonStandardValuesGeneric,
} from "ts-ics";
import { z } from "zod";
import { zIcsTrigger } from "./trigger";
import { zIcsAttendee } from "./attendee";
import { zIcsDuration } from "./duration";
import { zIcsAttachment } from "./attachment";

export const zIcsAlarm: z.ZodType<IcsAlarm<any>> = z.object({
  action: z.string().default("DISPLAY"),
  description: z.string().optional(),
  trigger: zIcsTrigger,
  attendees: z.array(zIcsAttendee).optional(),
  duration: zIcsDuration.optional(),
  repeat: z.number().optional(),
  summary: z.string().optional(),
  attachments: z.array(zIcsAttachment).optional(),
  nonStandard: z.record(z.any()),
});

export const parseIcsAlarm = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseAlarm<T>>
): ReturnType<ParseAlarm<T>> => convertIcsAlarm(zIcsAlarm, ...props);
