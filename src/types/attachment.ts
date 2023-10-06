import { z } from "zod";

export type Attachment = z.infer<typeof zAttachment>;

export const zAttachment = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("uri"),
    url: z.string().url(),
    formatType: z.string().optional(),
    encoding: z.never().optional(),
    value: z.never().optional(),
    binary: z.never().optional(),
  }),
  z.object({
    type: z.literal("binary"),
    url: z.never().optional(),
    formatType: z.never().optional(),
    encoding: z.enum(["BASE64"]),
    value: z.enum(["BINARY"]),
    binary: z.string(),
  }),
]);
