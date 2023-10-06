import { z } from "zod";

export type Organizer = z.infer<typeof zOrganizer>;

export const zOrganizer = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  dir: z.string().optional(),
  sentBy: z.string().email().optional(),
});
