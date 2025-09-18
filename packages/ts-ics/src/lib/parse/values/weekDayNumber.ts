import type { ConvertWeekDayNumber, IcsWeekDay } from "@/types/values/weekday";
import { standardValidate } from "../utils/standardValidate";
import type { Line } from "@/types";

const __convertIcsWeekDayNumber = (value: Line["value"]) => {
  const isWeekdayOnly = value.length === 2;

  if (isWeekdayOnly) return { day: value as IcsWeekDay };

  const occurrence = value.slice(0, -2);
  const day = value.replace(occurrence, "");

  return { day: day as IcsWeekDay, occurrence: Number(occurrence) };
};

export const convertIcsWeekDayNumber: ConvertWeekDayNumber = (schema, line) =>
  standardValidate(schema, __convertIcsWeekDayNumber(line.value));
