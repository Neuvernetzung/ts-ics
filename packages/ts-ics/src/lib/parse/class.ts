import type { ConvertClass, ClassType } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsClass: ConvertClass = (schema, line) =>
  standardValidate(schema, line.value as ClassType);
