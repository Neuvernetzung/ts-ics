import type { IcsExceptionDate } from "@/types/exceptionDate";
import { generateIcsTimeStamp } from "./timeStamp";

export const generateIcsExceptionDate = (
  exceptionDate: IcsExceptionDate,
  key: string
) => generateIcsTimeStamp(key, exceptionDate);
