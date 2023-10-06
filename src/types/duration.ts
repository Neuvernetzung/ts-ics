import { z } from "zod";

export type VEventDuration = z.infer<typeof zVEventDuration>;

export const zVEventDuration = z.object({
  before: z.boolean().optional(),
  weeks: z.number().optional(),
  days: z.number().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
});
