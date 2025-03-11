import { Attachment, encodingTypes, icsAttachmentToObject } from "ts-ics";
import { z } from "zod";

export const zAttachment: z.ZodType<Attachment> = z.discriminatedUnion("type", [
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
    encoding: z.enum(encodingTypes),
    value: z.enum(["BINARY"]),
    binary: z.string(),
  }),
]);

export const parseIcsAttachment = (
  attachmentString: string,
  options?: Record<string, string>
): Attachment =>
  zAttachment.parse(icsAttachmentToObject(attachmentString, options));
