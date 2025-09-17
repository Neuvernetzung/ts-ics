import {
  convertIcsAlarm,
  type ParseAlarm,
  type IcsAlarm,
  type NonStandardValuesGeneric,
} from "ts-ics";
import { z } from "zod";
import { zIcsTrigger } from "../values/trigger";
import { zIcsAttendee } from "../values/attendee";
import { zIcsDuration } from "../values/duration";
import { zIcsAttachment } from "../values/attachment";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsAlarm: z.ZodType<IcsAlarm<any>, IcsAlarm<any>> = z.object({
  action: z.string().default("DISPLAY"),
  description: z.string().optional(),
  trigger: zIcsTrigger,
  attendees: z.array(zIcsAttendee).optional(),
  duration: zIcsDuration.optional(),
  repeat: z.number().optional(),
  summary: z.string().optional(),
  attachments: z.array(zIcsAttachment).optional(),
  nonStandard: z.record(z.string(), z.any()).optional(),
});

export const parseIcsAlarm = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseAlarm<T>>
): ReturnType<ParseAlarm<T>> => convertIcsAlarm(zIcsAlarm, ...props);
