import type { IcsEvent } from "./event";
import { ParseNonStandardValue } from "./nonStandardValues";
import type { ConvertLinesType, ParseLinesType } from "./parse";
import type { IcsTimezone } from "./timezone";

export const calendarMethods = ["PUBLISH"] as const;

export type IcsCalendarMethods = typeof calendarMethods;
export type IcsCalenderMethod = IcsCalendarMethods[number];

export const calendarVersions = ["2.0"] as const;

export type IcsCalendarVersions = typeof calendarVersions;
export type IcsCalendarVersion = IcsCalendarVersions[number];

export type IcsCalendar<
  TNonStandardValues extends Record<string, any> = Record<string, any>
> = {
  version: IcsCalendarVersion;
  prodId: string;
  method?: IcsCalenderMethod | string;
  timezones?: IcsTimezone[];
  events?: IcsEvent[];
  name?: string;
  nonStandard?: TNonStandardValues;
};

export type ParseCalendarProps<TNonStandardValues extends Record<string, any>> =
  {
    nonStandard: {
      [K in keyof TNonStandardValues]: ParseNonStandardValue<
        TNonStandardValues[K]
      >;
    };
  };

export type ConvertCalendar<TNonStandardValues extends Record<string, any>> =
  ConvertLinesType<
    IcsCalendar<TNonStandardValues>,
    ParseCalendarProps<TNonStandardValues>
  >;

export type ParseCalendar = ParseLinesType<IcsCalendar>;
