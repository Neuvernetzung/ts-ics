import { setMilliseconds } from "date-fns";
import { z } from "zod";

export const dateObjectTypes = ["DATE", "DATE-TIME"] as const;

export type DateObjectTypes = typeof dateObjectTypes;
export type DateObjectType = DateObjectTypes[number];

export type DateObjectTzProps = {
  date: Date;
  timezone: string;
  tzoffset: string;
};

export const zDateObjectTzProps = z.object({
  date: z.date(),
  timezone: z.string(),
  tzoffset: z.string(),
});

export type DateObject = {
  date: Date;
  type?: DateObjectType;
  local?: DateObjectTzProps;
};

const zIcsDate = z.date().transform((date) => setMilliseconds(date, 0)); // Millisekunden sind nicht erlaubt bei Ics

export const zDateObject: z.ZodType<DateObject> = z.object({
  date: zIcsDate,
  type: z.enum(dateObjectTypes).optional(),
  local: zDateObjectTzProps.optional(),
});
