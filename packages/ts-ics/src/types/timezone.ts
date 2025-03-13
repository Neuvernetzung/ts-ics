import type { IcsDateObject } from "./date";
import type { ConvertComponentType, ParseComponentType } from "./parse";
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

export type ConvertTimezoneProp = ConvertComponentType<
  IcsTimezoneProp,
  ParseTimezonePropOptions
>;

export type ParseTimezoneProp = ParseComponentType<
  IcsTimezoneProp,
  ParseTimezonePropOptions
>;

export type IcsTimezone = {
  id: string;
  lastModified?: Date;
  url?: string;
  props: IcsTimezoneProp[];
};

export type ConvertTimezone = ConvertComponentType<IcsTimezone>;

export type ParseTimezone = ParseComponentType<IcsTimezone>;
