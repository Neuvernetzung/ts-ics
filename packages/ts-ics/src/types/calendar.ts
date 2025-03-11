import { type VEvent } from "./event";
import { LinesToObject, ParseLinesType } from "./parse";
import { type VTimezone } from "./timezone";

export const calendarMethods = ["PUBLISH"] as const;

export type VCalendarMethods = typeof calendarMethods;
export type VCalenderMethod = VCalendarMethods[number];

export const calendarVersions = ["2.0"] as const;

export type VCalendarVersions = typeof calendarVersions;
export type VCalendarVersion = VCalendarVersions[number];

export type VCalendar = {
  version: VCalendarVersion;
  prodId: string;
  method?: VCalenderMethod | string;
  timezones?: VTimezone[];
  events?: VEvent[];
  name?: string;
};

export type CalendarLinesToObject = LinesToObject<VCalendar>;

export type ParseCalendar = ParseLinesType<VCalendar>;
