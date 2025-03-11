import { StatusTypeLineToObject, type StatusType } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsStatusStringToStatus: StatusTypeLineToObject = (line, schema) =>
  standardValidate(schema, line.value as StatusType);
