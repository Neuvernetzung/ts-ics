import type { ConvertStatus, StatusType } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsStatus: ConvertStatus = (schema, line) =>
  standardValidate(schema, line.value as StatusType);
