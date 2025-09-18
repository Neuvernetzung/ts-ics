import type { ConvertLineType, ParseLineType } from "../parse";
import type { IcsTimezone } from "../components/timezone";

export const dateObjectTypes = ["DATE", "DATE-TIME"] as const;

export type DateObjectTypes = typeof dateObjectTypes;
export type DateObjectType = DateObjectTypes[number];

export type DateObjectTzProps = {
  date: Date;
  timezone: string;
  tzoffset: string;
};

export type IcsDateObject = {
  date: Date;
  type?: DateObjectType;
  local?: DateObjectTzProps;
};

export type ConvertDate = ConvertLineType<Date>;

export type ParseDate = ParseLineType<Date>;

export type ParseTimeStampOptions = { timezones?: IcsTimezone[] };

export type ConvertTimeStamp = ConvertLineType<
  IcsDateObject,
  ParseTimeStampOptions
>;

export type ParseTimeStamp = ParseLineType<
  IcsDateObject,
  ParseTimeStampOptions
>;
