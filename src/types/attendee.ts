import { z } from "zod";

export type Attendee = {
  email: string;
  name?: string;
  member?: string;
  delegatedFrom?: string;
  role?: string;
  partstat?: string;
  dir?: string;
  sentBy?: string;
};

export const zAttendee: z.ZodType<Attendee> = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  member: z.string().email().optional(),
  delegatedFrom: z.string().email().optional(),
  role: z.string().optional(),
  partstat: z.string().optional(),
  dir: z.string().url().optional(),
  sentBy: z.string().email().optional(),
});
