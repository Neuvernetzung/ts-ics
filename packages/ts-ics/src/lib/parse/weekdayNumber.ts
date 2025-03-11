import { type WeekDay, type WeekdayNumberObject } from "@/types/weekday";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";
import { Line } from "@/types";

const __icsWeekdayNumberToObject = (value: Line["value"]) => {
  const isWeekdayOnly = value.length === 2;

  if (isWeekdayOnly) return { day: value as WeekDay };

  const occurence = value.slice(0, -2);
  const day = value.replace(occurence, "");

  return { day: day as WeekDay, occurence: Number(occurence) };
};

export const icsWeekdayNumberToObject = (
  value: Line["value"],
  schema: StandardSchemaV1<WeekdayNumberObject> | undefined
): WeekdayNumberObject =>
  standardValidate(schema, __icsWeekdayNumberToObject(value));
