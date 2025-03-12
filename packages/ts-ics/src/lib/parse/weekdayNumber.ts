import type { ConvertWeekDayNumber, WeekDay } from "@/types/weekday";
import { standardValidate } from "./utils/standardValidate";
import type { Line } from "@/types";

const __convertIcsWeekDayNumber = (value: Line["value"]) => {
  const isWeekdayOnly = value.length === 2;

  if (isWeekdayOnly) return { day: value as WeekDay };

  const occurence = value.slice(0, -2);
  const day = value.replace(occurence, "");

  return { day: day as WeekDay, occurence: Number(occurence) };
};

export const convertIcsWeekDayNumber: ConvertWeekDayNumber = (schema, line) =>
  standardValidate(schema, __convertIcsWeekDayNumber(line.value));
