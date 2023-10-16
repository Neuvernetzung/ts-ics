import { z } from "zod";

export const attendeePartStatusTypes = [
  "TENTATIVE",
  "ACCEPTED",
  "CANCELLED",
  "DELEGATED",
] as const;

export type AttendeePartStatusTypes = typeof attendeePartStatusTypes;
export type AttendeePartStatusType = AttendeePartStatusTypes[number];

export type Attendee = {
  email: string;
  name?: string;
  member?: string;
  delegatedFrom?: string;
  role?: string;
  partstat?: AttendeePartStatusType;
  dir?: string;
  sentBy?: string;
};

export const zAttendee: z.ZodType<Attendee> = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  member: z.string().email().optional(),
  delegatedFrom: z.string().email().optional(),
  role: z.string().optional(),
  partstat: z.enum(attendeePartStatusTypes).optional(),
  dir: z.string().url().optional(),
  sentBy: z.string().email().optional(),
});
