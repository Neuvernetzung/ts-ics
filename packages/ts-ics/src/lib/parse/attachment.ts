import { AttachmentLineToObject, type Attachment } from "@/types/attachment";
import { standardValidate } from "./utils/standardValidate";

export const icsAttachmentToObject: AttachmentLineToObject = (schema, line) => {
  const attachment: Attachment =
    line.options?.VALUE === "BINARY"
      ? {
          type: "binary",
          encoding:
            (line.options?.ENCODING as Attachment["encoding"]) || "BASE64",
          binary: line.value,
          value: line.options?.VALUE,
        }
      : {
          type: "uri",
          url: line.value,
          formatType: line.options?.FMTTYPE,
        };

  return standardValidate(schema, attachment);
};
