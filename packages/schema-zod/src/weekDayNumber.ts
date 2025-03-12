import { convertIcsWeekDayNumber, type ParseWeekDayNumber } from "ts-ics";
import { zWeekdayNumberObject } from "./weekDay";

export const parseIcsWeekdayNumber: ParseWeekDayNumber = (...props) =>
  convertIcsWeekDayNumber(zWeekdayNumberObject, ...props);
