import { Line, weekDays, type WeekDay } from "@/types";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsWeekDayStringToWeekDay = (
  line: Line,
  schema: StandardSchemaV1<WeekDay> | undefined
): WeekDay => standardValidate(schema, line.value as WeekDay);
