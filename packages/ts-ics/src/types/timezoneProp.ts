import { IcsDateObject } from "./date";
import {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import { ConvertComponentType, ParseComponentType } from "./parse";
import { IcsRecurrenceRule } from "./recurrenceRule";
import { IcsTimezone } from "./timezone";

export const timezonePropTypes = ["STANDARD", "DAYLIGHT"] as const;

export type IcsTimezonePropTypes = typeof timezonePropTypes;
export type IcsTimezonePropType = IcsTimezonePropTypes[number];

export type IcsTimezoneProp<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  type: IcsTimezonePropType;
  start: Date;
  offsetTo: string;
  offsetFrom: string;
  recurrenceRule?: IcsRecurrenceRule;
  comment?: string;
  recurrenceDate?: IcsDateObject;
  name?: string;
  nonStandard?: TNonStandardValues;
};

export type ParseTimezonePropOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  type?: IcsTimezonePropType;
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertTimezoneProp<
  TNonStandardValues extends NonStandardValuesGeneric
> = ConvertComponentType<
  IcsTimezoneProp<TNonStandardValues>,
  ParseTimezonePropOptions<TNonStandardValues>
>;

export type ParseTimezoneProp<
  TNonStandardValues extends NonStandardValuesGeneric
> = ParseComponentType<
  IcsTimezoneProp<TNonStandardValues>,
  ParseTimezonePropOptions<TNonStandardValues>
>;
