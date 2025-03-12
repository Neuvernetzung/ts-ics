import type { DateObject } from "./date";
import type { LineToObject, ParseLineType } from "./parse";
import type { VTimezone } from "./timezone";

export type ExceptionDate = DateObject;

export type ExceptionDates = ExceptionDate[];

export type ParseExceptionDatesOptions = { timezones?: VTimezone[] };

export type ExceptionDatesLineToObject = LineToObject<
  ExceptionDates,
  ParseExceptionDatesOptions
>;

export type ParseExceptionDates = ParseLineType<
  ExceptionDates,
  ParseExceptionDatesOptions
>;
