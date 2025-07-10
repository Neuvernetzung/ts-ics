import {
  convertIcsDuration,
  type IcsDuration,
  type ParseDuration,
} from "ts-ics";
import { z } from "zod";

export const zIcsDuration: z.ZodType<IcsDuration, IcsDuration> = z.object({
  before: z.boolean().optional(),
  weeks: z.number().optional(),
  days: z.number().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
});

export const parseIcsDuration: ParseDuration = (...props) =>
  convertIcsDuration(zIcsDuration, ...props);
