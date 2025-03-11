import { WeekDayLineToWeekDay, type WeekDay } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsWeekDayStringToWeekDay: WeekDayLineToWeekDay = (schema, line) =>
  standardValidate(schema, line.value as WeekDay);
