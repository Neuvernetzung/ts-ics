import { WeekDayLineToWeekDay, type WeekDay } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsWeekDayStringToWeekDay: WeekDayLineToWeekDay = (line, schema) =>
  standardValidate(schema, line.value as WeekDay);
