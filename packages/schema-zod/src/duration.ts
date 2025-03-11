import { icsDurationToObject, VEventDuration } from "ts-ics";
import { z } from "zod";

export const zVEventDuration: z.ZodType<VEventDuration> = z.object({
  before: z.boolean().optional(),
  weeks: z.number().optional(),
  days: z.number().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
});

export const parseIcsDuration = (durationString: string): VEventDuration =>
  zVEventDuration.parse(icsDurationToObject(durationString));
