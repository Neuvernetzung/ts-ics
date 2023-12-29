import { z } from "zod";

export type Organizer = {
  name?: string;
  email: string;
  dir?: string;
  sentBy?: string;
};

export const zOrganizer: z.ZodType<Organizer> = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  dir: z.string().optional(),
  sentBy: z.string().email().optional(),
});
