import { ExceptionDatesLineToObject } from "@/types/exceptionDate";
import { icsTimeStampToObject } from "./timeStamp";
import { standardValidate } from "./utils/standardValidate";

export const icsExceptionDateToObject: ExceptionDatesLineToObject = (
  line,
  schema,
  options
) =>
  standardValidate(
    schema,
    line.value
      .split(",")
      .map((value) =>
        icsTimeStampToObject(
          { value, options: line.options },
          undefined,
          options
        )
      )
  );
