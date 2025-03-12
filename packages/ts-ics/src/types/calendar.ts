import type { IcsEvent } from "./event";
import type { ConvertLinesType, ParseLinesType } from "./parse";
import type { IcsTimezone } from "./timezone";

export const calendarMethods = ["PUBLISH"] as const;

export type IcsCalendarMethods = typeof calendarMethods;
export type IcsCalenderMethod = IcsCalendarMethods[number];

export const calendarVersions = ["2.0"] as const;

export type IcsCalendarVersions = typeof calendarVersions;
export type IcsCalendarVersion = IcsCalendarVersions[number];

export type IcsCalendar = {
  version: IcsCalendarVersion;
  prodId: string;
  method?: IcsCalenderMethod | string;
  timezones?: IcsTimezone[];
  events?: IcsEvent[];
  name?: string;
};

export type ConvertCalendar = ConvertLinesType<IcsCalendar>;

export type ParseCalendar = ParseLinesType<IcsCalendar>;
