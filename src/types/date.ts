import { z } from "zod";

export const dateObjectTypes = ["DATE", "DATE-TIME"] as const;

export type DateObjectTypes = typeof dateObjectTypes;
export type DateObjectType = DateObjectTypes[number];

export type DateObject = z.infer<typeof zDateObject>;

export const zDateObject = z.object({
  date: z.date(),
  type: z.enum(dateObjectTypes).optional(),
  timezone: z.string().optional(),
});
