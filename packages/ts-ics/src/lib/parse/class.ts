import { classTypes, Line, type ClassType } from "@/types";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsClassStringToClass = (
  line: Line,
  schema: StandardSchemaV1<ClassType> | undefined
) => standardValidate(schema, line.value as ClassType);
