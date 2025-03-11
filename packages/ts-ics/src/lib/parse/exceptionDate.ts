import { type ExceptionDates } from "@/types/exceptionDate";
import { icsTimeStampToObject } from "./timeStamp";
import { Line } from "@/types";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsExceptionDateToObject = (
  line: Line,
  schema: StandardSchemaV1<ExceptionDates> | undefined
): ExceptionDates =>
  standardValidate(
    schema,
    line.value
      .split(",")
      .map((value) =>
        icsTimeStampToObject({ value, options: line.options }, undefined)
      )
  );
