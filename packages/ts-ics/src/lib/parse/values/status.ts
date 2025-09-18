import type {
  ConvertEventStatus,
  ConvertJournalStatus,
  ConvertTodoStatus,
  IcsEventStatusType,
  IcsJournalStatusType,
  IcsTodoStatusType,
} from "@/types";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsEventStatus: ConvertEventStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsEventStatusType);

export const convertIcsTodoStatus: ConvertTodoStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsTodoStatusType);

export const convertIcsJournalStatus: ConvertJournalStatus = (schema, line) =>
  standardValidate(schema, line.value as IcsJournalStatusType);
