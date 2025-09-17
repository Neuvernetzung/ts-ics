import {
  convertIcsRecurrenceId,
  type ParseRecurrenceId,
  type IcsRecurrenceId,
} from "ts-ics";
import { z } from "zod";
import { zIcsDateObject } from "./date";

export const zIcsRecurrenceId: z.ZodType<IcsRecurrenceId, IcsRecurrenceId> =
  z.object({
    range: z.literal("THISANDFUTURE").optional(),
    value: zIcsDateObject,
  });

export const parseIcsRecurrenceId: ParseRecurrenceId = (...props) =>
  convertIcsRecurrenceId(zIcsRecurrenceId, ...props);
