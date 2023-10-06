import { z } from "zod";

import { zDateObject } from "./date";

export type RecurrenceId = z.infer<typeof zRecurrenceId>;

export const zRecurrenceId = z.object({
  range: z.literal("THISANDFUTURE").optional(),
  value: zDateObject,
});
