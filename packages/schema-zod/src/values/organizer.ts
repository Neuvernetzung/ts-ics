import {
  convertIcsOrganizer,
  type IcsOrganizer,
  type ParseOrganizer,
} from "ts-ics";
import { z } from "zod";

export const zIcsOrganizer: z.ZodType<IcsOrganizer, IcsOrganizer> = z.object({
  name: z.string().optional(),
  email: z.email(),
  dir: z.string().optional(),
  sentBy: z.email().optional(),
});

export const parseIcsOrganizer: ParseOrganizer = (...props) =>
  convertIcsOrganizer(zIcsOrganizer, ...props);
