import type { ExceptionDate } from "@/types/exceptionDate";
import { generateIcsTimeStamp } from "./timeStamp";

export const generateIcsExceptionDate = (
  exceptionDate: ExceptionDate,
  key: string
) => generateIcsTimeStamp(key, exceptionDate);
