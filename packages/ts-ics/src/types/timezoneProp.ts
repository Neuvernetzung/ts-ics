import type { IcsDateObject } from "./date";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type { IcsRecurrenceRule } from "./recurrenceRule";
import type { IcsTimezone } from "./timezone";

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
