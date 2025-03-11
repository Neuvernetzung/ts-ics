import { type DateObject } from "./date";
import { LineToObject, ParseLineType } from "./parse";
import { VTimezone } from "./timezone";

export type RecurrenceId = {
  range?: "THISANDFUTURE";
  value: DateObject;
};

export type ParseRecurrenceIdOptions = { timezones?: VTimezone[] };

export type RecurrenceIdLineToObject = LineToObject<
  RecurrenceId,
  [ParseRecurrenceIdOptions]
>;

export type ParseRecurrenceId = ParseLineType<
  RecurrenceId,
  [ParseRecurrenceIdOptions]
>;
