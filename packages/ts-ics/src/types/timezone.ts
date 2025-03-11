import { type DateObject } from "./date";
import { LinesToObject, ParseLinesType } from "./parse";
import { type RecurrenceRule } from "./recurrenceRule";

export const timezonePropTypes = ["STANDARD", "DAYLIGHT"] as const;

export type VTimezonePropTypes = typeof timezonePropTypes;
export type VTimezonePropType = VTimezonePropTypes[number];

export type VTimezoneProp = {
  type: VTimezonePropType;
  start: Date;
  offsetTo: string;
  offsetFrom: string;
  recurrenceRule?: RecurrenceRule;
  comment?: string;
  recurrenceDate?: DateObject;
  name?: string;
};

export type ParseTimezonePropOptions = {
  type?: VTimezonePropType;
  timezones?: VTimezone[];
};

export type TimezonePropLinesToObject = LinesToObject<
  VTimezoneProp,
  [ParseTimezonePropOptions]
>;

export type ParseTimezoneProp = ParseLinesType<
  VTimezoneProp,
  [ParseTimezonePropOptions]
>;

export type VTimezone = {
  id: string;
  lastModified?: Date;
  url?: string;
  props: VTimezoneProp[];
};

export type TimezoneLinesToObject = LinesToObject<VTimezone>;

export type ParseTimezone = ParseLinesType<VTimezone>;
