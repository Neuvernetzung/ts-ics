import type { ConvertStatus, IcsStatusType } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsStatus: ConvertStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsStatusType);
