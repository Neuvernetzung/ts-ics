import type { ConvertEventStatus, IcsEventStatusType } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsStatus: ConvertEventStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsEventStatusType);
