import { z } from "zod";

export const encodingTypes = ["BASE64"] as const;

export type EncodingTypes = typeof encodingTypes;
export type EncodingType = EncodingTypes[number];

export const valueTypes = ["BINARY"] as const;

export type ValueTypes = typeof valueTypes;
export type ValueType = ValueTypes[number];

export type Attachment =
  | {
      type: "uri";
      url: string;
      formatType?: string;
      encoding?: never;
      value?: never;
      binary?: never;
    }
  | {
      type: "binary";
      url?: never;
      formatType?: never;
      encoding?: EncodingType;
      value?: ValueType;
      binary: string;
    };

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
