import type { IcsEvent } from "./event";
import type { IcsFreeBusy } from "./freebusy";
import type { IcsJournal } from "./journal";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "../nonStandard/nonStandardValues";
import type { ConvertComponentType, ParseComponentType } from "../parse";
import type { IcsTimezone } from "./timezone";
import type { IcsTodo } from "./todo";

export const calendarMethods = ["PUBLISH"] as const;

export type IcsCalendarMethods = typeof calendarMethods;
export type IcsCalenderMethod = IcsCalendarMethods[number];

export const calendarVersions = ["2.0"] as const;

export type IcsCalendarVersions = typeof calendarVersions;
export type IcsCalendarVersion = IcsCalendarVersions[number];

export type IcsCalendar<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  version: IcsCalendarVersion;
  prodId: string;
  method?: IcsCalenderMethod | string;
  timezones?: IcsTimezone<TNonStandardValues>[];
  events?: IcsEvent<TNonStandardValues>[];
  todos?: IcsTodo<TNonStandardValues>[];
  journals?: IcsJournal<TNonStandardValues>[];
  freeBusy?: IcsFreeBusy<TNonStandardValues>[];
  name?: string;
  nonStandard?: Partial<TNonStandardValues>;
};

export type ParseCalendarOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertCalendar<
  TNonStandardValues extends NonStandardValuesGeneric
> = ConvertComponentType<
  IcsCalendar<TNonStandardValues>,
  ParseCalendarOptions<TNonStandardValues>
>;

export type ParseCalendar<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsCalendar<TNonStandardValues>,
    ParseCalendarOptions<TNonStandardValues>
  >;
