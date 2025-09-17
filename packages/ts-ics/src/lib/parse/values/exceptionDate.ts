import type { ConvertExceptionDates } from "@/types/values/exceptionDate";
import { convertIcsTimeStamp } from "./timeStamp";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsExceptionDates: ConvertExceptionDates = (
  schema,
  line,
  options
) =>
  standardValidate(
    schema,
    line.value
      .split(",")
      .map((value) =>
        convertIcsTimeStamp(
          undefined,
          { value, options: line.options },
          options
        )
      )
  );
