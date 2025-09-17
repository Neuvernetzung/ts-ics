import type { IcsExceptionDate } from "@/types/exceptionDate";
import { generateIcsTimeStamp } from "./timeStamp";
import type { IcsTimezone } from "@/types";

type GenerateIcsExceptionDateOptions = {
  timezones?: IcsTimezone[];
};

export const generateIcsExceptionDate = (
  exceptionDate: IcsExceptionDate,
  key: string,
  options?: GenerateIcsExceptionDateOptions
) => generateIcsTimeStamp(key, exceptionDate, undefined, options);
