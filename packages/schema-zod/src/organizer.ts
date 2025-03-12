import {
  convertIcsOrganizer,
  type IcsOrganizer,
  type ParseOrganizer,
} from "ts-ics";
import { z } from "zod";

export const zIcsOrganizer: z.ZodType<IcsOrganizer> = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  dir: z.string().optional(),
  sentBy: z.string().email().optional(),
});

export const parseIcsOrganizer: ParseOrganizer = (...props) =>
  convertIcsOrganizer(zIcsOrganizer, ...props);
