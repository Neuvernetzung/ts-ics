import {
  type IcsAttendee,
  attendeePartStatusTypes,
  convertIcsAttendee,
  type ParseAttendee,
} from "ts-ics";
import { z } from "zod";

export const zIcsAttendee: z.ZodType<IcsAttendee> = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  member: z.string().email().optional(),
  delegatedFrom: z.string().email().optional(),
  role: z.string().optional(),
  partstat: z.enum(attendeePartStatusTypes).optional(),
  dir: z.string().url().optional(),
  sentBy: z.string().email().optional(),
});

export const parseIcsAttendee: ParseAttendee = (...props) =>
  convertIcsAttendee(zIcsAttendee, ...props);
