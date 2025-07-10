import {
  type IcsAttendee,
  attendeePartStatusTypes,
  convertIcsAttendee,
  type ParseAttendee,
} from "ts-ics";
import { z } from "zod";

export const zIcsAttendee: z.ZodType<IcsAttendee, IcsAttendee> = z.object({
  email: z.email(),
  name: z.string().optional(),
  member: z.email().optional(),
  delegatedFrom: z.email().optional(),
  role: z.string().optional(),
  partstat: z.enum(attendeePartStatusTypes).optional(),
  dir: z.url().optional(),
  sentBy: z.email().optional(),
  rsvp: z.boolean().optional(),
});

export const parseIcsAttendee: ParseAttendee = (...props) =>
  convertIcsAttendee(zIcsAttendee, ...props);
