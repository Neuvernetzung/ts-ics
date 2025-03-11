import { type Attachment } from "@/types/attachment";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsAttachmentToObject = (
  attachmentString: string,
  schema?: StandardSchemaV1<Attachment>,
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

  return standardValidate(schema, {
    type: "uri",
    url: attachmentString,
    formatType: options?.FMTTYPE,
  });
};
