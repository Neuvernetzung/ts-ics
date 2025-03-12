import type { IcsDateObject } from "./date";
import type { ConvertLinesType, ParseLinesType } from "./parse";
import type { IcsRecurrenceRule } from "./recurrenceRule";

export const timezonePropTypes = ["STANDARD", "DAYLIGHT"] as const;

export type IcsTimezonePropTypes = typeof timezonePropTypes;
export type IcsTimezonePropType = IcsTimezonePropTypes[number];

export type IcsTimezoneProp = {
  type: IcsTimezonePropType;
  start: Date;
  offsetTo: string;
  offsetFrom: string;
  recurrenceRule?: IcsRecurrenceRule;
  comment?: string;
  recurrenceDate?: IcsDateObject;
  name?: string;
};

export type ParseTimezonePropOptions = {
  type?: IcsTimezonePropType;
  timezones?: IcsTimezone[];
};

export type ConvertTimezoneProp = ConvertLinesType<
  IcsTimezoneProp,
  ParseTimezonePropOptions
>;

export type ParseTimezoneProp = ParseLinesType<
  IcsTimezoneProp,
  ParseTimezonePropOptions
>;

export type IcsTimezone = {
  id: string;
  lastModified?: Date;
  url?: string;
  props: IcsTimezoneProp[];
};

export type ConvertTimezone = ConvertLinesType<IcsTimezone>;

export type ParseTimezone = ParseLinesType<IcsTimezone>;
