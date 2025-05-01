import type {
  ConvertEventStatus,
  ConvertTodoStatus,
  IcsEventStatusType,
  IcsTodoStatusType,
} from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsEventStatus: ConvertEventStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsEventStatusType);

export const convertIcsTodoStatus: ConvertTodoStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsTodoStatusType);
