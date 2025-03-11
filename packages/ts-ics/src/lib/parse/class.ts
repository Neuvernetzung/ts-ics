import { ClassTypeLineToObject, type ClassType } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsClassStringToClass: ClassTypeLineToObject = (schema, line) =>
  standardValidate(schema, line.value as ClassType);
