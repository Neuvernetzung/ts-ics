import { icsDurationToObject, Duration, Line, ParseDuration } from "ts-ics";
import { z } from "zod";

export const zDuration: z.ZodType<Duration> = z.object({
  before: z.boolean().optional(),
  weeks: z.number().optional(),
  days: z.number().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
});

export const parseIcsDuration: ParseDuration = (...props) =>
  icsDurationToObject(zDuration, ...props);
