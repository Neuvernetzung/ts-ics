import type {
  ConvertAttachment,
  IcsAttachment,
} from "@/types/values/attachment";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsAttachment: ConvertAttachment = (schema, line) => {
  const attachment: IcsAttachment =
    line.options?.VALUE === "BINARY"
      ? {
          type: "binary",
          encoding:
            (line.options?.ENCODING as IcsAttachment["encoding"]) || "BASE64",
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
