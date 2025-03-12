import type { ConvertLineType, ParseLineType } from "./parse";

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

export type ConvertAttachment = ConvertLineType<Attachment>;

export type ParseAttachment = ParseLineType<Attachment>;
