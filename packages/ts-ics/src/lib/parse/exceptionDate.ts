
import { zExceptionDates, type ExceptionDates } from "@/types/exceptionDate";
import { icsTimeStampToObject } from "./timeStamp";

export const icsExceptionDateToObject = (
  exceptionDateString: string,
  options?: Record<string, string>
): ExceptionDates =>
  exceptionDateString
    .split(",")
    .map((timeStamp) => icsTimeStampToObject(timeStamp, options));

export const parseIcsExceptionDate = (
  exceptionDateString: string,
  options?: Record<string, string>
): ExceptionDates =>
  zExceptionDates.parse(icsExceptionDateToObject(exceptionDateString, options));
