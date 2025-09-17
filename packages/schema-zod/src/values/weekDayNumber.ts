import { convertIcsWeekDayNumber, type ParseWeekDayNumber } from "ts-ics";
import { zIcsWeekdayNumber } from "./weekDay";

export const parseIcsWeekdayNumber: ParseWeekDayNumber = (...props) =>
  convertIcsWeekDayNumber(zIcsWeekdayNumber, ...props);
