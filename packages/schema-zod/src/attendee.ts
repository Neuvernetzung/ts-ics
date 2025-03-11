import {
  Attendee,
  attendeePartStatusTypes,
  icsAttendeeToObject,
  Line,
} from "ts-ics";
import { z } from "zod";

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

export const parseIcsAttendee = (line: Line): Attendee =>
  icsAttendeeToObject(line, zAttendee);
