import { type ExceptionDates } from "@/types/exceptionDate";
import { icsTimeStampToObject } from "./timeStamp";

export const icsExceptionDateToObject = (
  exceptionDateString: string,
  options?: Record<string, string>
): ExceptionDates =>
  exceptionDateString
    .split(",")
    .map((timeStamp) => icsTimeStampToObject(timeStamp, options));
