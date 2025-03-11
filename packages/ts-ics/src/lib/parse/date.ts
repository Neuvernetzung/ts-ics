import type { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";
import { DateLineToDate, Line } from "@/types";

export const icsDateToDate: DateLineToDate = (schema, line) => {
  const year = Number.parseInt(line.value.slice(0, 4), 10);
  const month = Number.parseInt(line.value.slice(4, 6), 10) - 1; // Monate in JavaScript sind 0-basiert
  const day = Number.parseInt(line.value.slice(6, 8), 10);

  const newDate = new Date(Date.UTC(year, month, day));

  return standardValidate(schema, newDate);
};

export const icsDateTimeToDateTime: DateLineToDate = (schema, line) => {
  const year = Number.parseInt(line.value.slice(0, 4), 10);
  const month = Number.parseInt(line.value.slice(4, 6), 10) - 1; // Monate in JavaScript sind 0-basiert
  const day = Number.parseInt(line.value.slice(6, 8), 10);
  const hour = Number.parseInt(line.value.slice(9, 11), 10);
  const minute = Number.parseInt(line.value.slice(11, 13), 10);
  const second = Number.parseInt(line.value.slice(13, 15), 10);

  const newDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  return standardValidate(schema, newDate);
};
