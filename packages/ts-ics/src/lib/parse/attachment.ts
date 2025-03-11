import { type Attachment } from "@/types/attachment";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";
import { Line } from "@/types";

export const icsAttachmentToObject = (
  line: Line,
  schema: StandardSchemaV1<Attachment> | undefined
): Attachment => {
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
