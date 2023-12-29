import { z } from "zod";

import { type DateObject, zDateObject } from "./date";

export type RecurrenceId = {
  range?: "THISANDFUTURE";
  value: DateObject;
};

export const zRecurrenceId: z.ZodType<RecurrenceId> = z.object({
  range: z.literal("THISANDFUTURE").optional(),
  value: zDateObject,
});
