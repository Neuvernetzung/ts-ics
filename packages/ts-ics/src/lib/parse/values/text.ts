import type { ConvertText } from "@/types/values/text";
import { standardValidate } from "../utils/standardValidate";
import { unescapeTextString } from "../utils/unescapeText";

export const convertIcsText: ConvertText = (schema, line) =>
  standardValidate(schema, unescapeTextString(line.value));
