import type { ConvertLineType, ParseLineType } from "./parse";
import type { VTimezone } from "./timezone";

export const dateObjectTypes = ["DATE", "DATE-TIME"] as const;

export type DateObjectTypes = typeof dateObjectTypes;
export type DateObjectType = DateObjectTypes[number];

export type DateObjectTzProps = {
  date: Date;
  timezone: string;
  tzoffset: string;
};

export type DateObject = {
  date: Date;
  type?: DateObjectType;
  local?: DateObjectTzProps;
};

export type ConvertDate = ConvertLineType<Date>;

export type ParseDate = ParseLineType<Date>;

export type ParseTimeStampOptions = { timezones?: VTimezone[] };

export type ConvertTimeStamp = ConvertLineType<
  DateObject,
  ParseTimeStampOptions
>;

export type ParseTimeStamp = ParseLineType<DateObject, ParseTimeStampOptions>;
