import {
  VTIMEZONE_DAYLIGHT_OBJECT_KEY,
  VTIMEZONE_STANDARD_OBJECT_KEY,
} from "@/constants";
import type { IcsDateObject } from "../values/date";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "../nonStandard/nonStandardValues";
import type { ConvertComponentType, ParseComponentType } from "../parse";
import type { IcsRecurrenceRule } from "../values/recurrenceRule";
import type { IcsTimezone } from "./timezone";

export const TIMEZONE_PROP_COMPONENTS = [
  VTIMEZONE_STANDARD_OBJECT_KEY,
  VTIMEZONE_DAYLIGHT_OBJECT_KEY,
] as const;

export type IcsTimezonePropTypes = typeof TIMEZONE_PROP_COMPONENTS;
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
