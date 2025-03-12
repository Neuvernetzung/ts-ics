import type { IcsDateObject } from "./date";
import type { ConvertLineType, ParseLineType } from "./parse";
import type { IcsTimezone } from "./timezone";

export type IcsRecurrenceId = {
  range?: "THISANDFUTURE";
  value: IcsDateObject;
};

export type ParseRecurrenceIdOptions = { timezones?: IcsTimezone[] };

export type ConvertRecurrenceId = ConvertLineType<
  IcsRecurrenceId,
  ParseRecurrenceIdOptions
>;

export type ParseRecurrenceId = ParseLineType<
  IcsRecurrenceId,
  ParseRecurrenceIdOptions
>;
