import { icsWeekdayNumberToObject, WeekdayNumberObject } from "ts-ics";
import { zWeekdayNumberObject } from "./weekDay";

export const parseIcsWeekdayNumber = (
  weekdayNumberString: string
): WeekdayNumberObject =>
  zWeekdayNumberObject.parse(icsWeekdayNumberToObject(weekdayNumberString));
