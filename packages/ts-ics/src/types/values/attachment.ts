import type { ConvertLineType, ParseLineType } from "../parse";

export const attachmentEncodingTypes = ["BASE64"] as const;

export type IcsAttachmentEncodingTypes = typeof attachmentEncodingTypes;
export type IcsAttachmentEncodingType = IcsAttachmentEncodingTypes[number];

export const attachmentValueTypes = ["BINARY"] as const;

export type IcsAttachmentValueTypes = typeof attachmentValueTypes;
export type IcsAttachmentValueType = IcsAttachmentValueTypes[number];

export type IcsAttachment =
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
      encoding?: IcsAttachmentEncodingType;
      value?: IcsAttachmentValueType;
      binary: string;
    };

export type ConvertAttachment = ConvertLineType<IcsAttachment>;

export type ParseAttachment = ParseLineType<IcsAttachment>;
