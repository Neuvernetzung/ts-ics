import {
  type IcsAttachment,
  attachmentEncodingTypes,
  convertIcsAttachment,
  type ParseAttachment,
} from "ts-ics";
import { z } from "zod";

export const zIcsAttachment: z.ZodType<IcsAttachment, IcsAttachment> = z.union([
  z.object({
    type: z.literal("uri"),
    url: z.url(),
    formatType: z.string().optional(),
    encoding: z.never().optional(),
    value: z.never().optional(),
    binary: z.never().optional(),
  }),
  z.object({
    type: z.literal("binary"),
    url: z.never().optional(),
    formatType: z.never().optional(),
    encoding: z.enum(attachmentEncodingTypes),
    value: z.enum(["BINARY"]),
    binary: z.string(),
  }),
]);

export const parseIcsAttachment: ParseAttachment = (...props) =>
  convertIcsAttachment(zIcsAttachment, ...props);
