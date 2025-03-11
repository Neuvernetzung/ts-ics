import { Line, statusTypes, type StatusType } from "@/types";
import { standardValidate } from "./utils/standardValidate";
import { StandardSchemaV1 } from "@standard-schema/spec";

export const icsStatusStringToStatus = (
  line: Line,
  schema: StandardSchemaV1<StatusType> | undefined
): StatusType => standardValidate(schema, line.value as StatusType);
