import type { ConvertWeekDay, IcsWeekDay } from "@/types";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsWeekDay: ConvertWeekDay = (schema, line) =>
  standardValidate(schema, line.value as IcsWeekDay);
