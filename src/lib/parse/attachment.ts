import { Attachment, zAttachment } from "@/types/attachment";

export const icsAttachmentToObject = (
  attachmentString: string,
  options?: Record<string, string>
): Attachment => {
  if (options?.VALUE === "BINARY") {
    return {
      type: "binary",
      encoding: (options?.ENCODING as Attachment["encoding"]) || "BASE64",
      binary: attachmentString,
      value: options?.VALUE,
    };
  }

  return { type: "uri", url: attachmentString, formatType: options?.FMTTYPE };
};

export const parseIcsAttachment = (
  attachmentString: string,
  options?: Record<string, string>
) => zAttachment.parse(icsAttachmentToObject(attachmentString, options));
