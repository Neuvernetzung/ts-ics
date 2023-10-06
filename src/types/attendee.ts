import { z } from "zod";

export type Attendee = z.infer<typeof zAttendee>;

export const zAttendee = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  member: z.string().email().optional(),
  delegatedFrom: z.string().email().optional(),
  role: z.string().optional(),
  partstat: z.string().optional(),
  dir: z.string().url().optional(),
  sentBy: z.string().email().optional(),
});
