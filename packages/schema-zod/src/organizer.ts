import { icsOrganizerToObject, Organizer } from "ts-ics";
import { z } from "zod";

export const zOrganizer: z.ZodType<Organizer> = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  dir: z.string().optional(),
  sentBy: z.string().email().optional(),
});

export const parseIcsOrganizer = (
  organizerString: string,
  options?: Record<string, string>
): Organizer =>
  zOrganizer.parse(icsOrganizerToObject(organizerString, options));
