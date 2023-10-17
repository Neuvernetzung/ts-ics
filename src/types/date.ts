import { setMilliseconds } from "date-fns";
import { z } from "zod";

export const dateObjectTypes = ["DATE", "DATE-TIME"] as const;

export type DateObjectTypes = typeof dateObjectTypes;
export type DateObjectType = DateObjectTypes[number];

export type DateObject = {
  date: Date;
  type?: DateObjectType;
  timezone?: string;
};

export const zDateObject: z.ZodType<DateObject> = z.object({
  date: z.date().transform((date) => setMilliseconds(date, 0)), // Millisekunden sind nicht erlaubt bei Ics
  type: z.enum(dateObjectTypes).optional(),
  timezone: z.string().optional(),
});
