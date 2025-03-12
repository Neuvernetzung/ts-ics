import type { IcsDateObject } from "./date";
import type { ConvertLineType, ParseLineType } from "./parse";
import type { IcsTimezone } from "./timezone";

export type IcsExceptionDate = IcsDateObject;

export type IcsExceptionDates = IcsExceptionDate[];

export type ParseExceptionDatesOptions = { timezones?: IcsTimezone[] };

export type ConvertExceptionDates = ConvertLineType<
  IcsExceptionDates,
  ParseExceptionDatesOptions
>;

export type ParseExceptionDates = ParseLineType<
  IcsExceptionDates,
  ParseExceptionDatesOptions
>;
