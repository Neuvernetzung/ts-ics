import type { ExceptionDatesLineToObject } from "@/types/exceptionDate";
import { icsTimeStampToObject } from "./timeStamp";
import { standardValidate } from "./utils/standardValidate";

export const icsExceptionDateToObject: ExceptionDatesLineToObject = (
  schema,
  line,
  options
) =>
  standardValidate(
    schema,
    line.value
      .split(",")
      .map((value) =>
        icsTimeStampToObject(
          undefined,
          { value, options: line.options },
          options
        )
      )
  );
