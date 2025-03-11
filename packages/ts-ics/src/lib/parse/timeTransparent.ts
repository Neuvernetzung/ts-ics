import { Line, timeTransparentTypes, type TimeTransparentType } from "@/types";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsTimeTransparentStringToTimeTransparent = (
  line: Line,
  schema: StandardSchemaV1<TimeTransparentType> | undefined
): TimeTransparentType =>
  standardValidate(schema, line.value as TimeTransparentType);
