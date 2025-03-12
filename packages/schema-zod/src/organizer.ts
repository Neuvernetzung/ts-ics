import {
  convertIcsOrganizer,
  type Organizer,
  type ParseOrganizer,
} from "ts-ics";
import { z } from "zod";

export const zOrganizer: z.ZodType<Organizer> = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  dir: z.string().optional(),
  sentBy: z.string().email().optional(),
});

export const parseIcsOrganizer: ParseOrganizer = (...props) =>
  convertIcsOrganizer(zOrganizer, ...props);
