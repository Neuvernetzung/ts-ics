import type { ConvertInteger } from "@/types";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsInteger: ConvertInteger = (schema, line) =>
  standardValidate(schema, Number.parseInt(line.value, 10));
