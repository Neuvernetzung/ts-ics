import type { IcsDateObject } from "./date";
import type { IcsTimezone } from "./timezone";
import type {
  ConvertComponentType,
  ConvertLineType,
  ParseComponentType,
  ParseLineType,
} from "./parse";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import type { IcsOrganizer } from "./organizer";
import type { IcsAttendee } from "./attendee";
import type { IcsDuration } from "./duration";

export const freeBusyTypes = [
  "FREE",
  "BUSY",
  "BUSY-UNAVAILABLE",
  "BUSY-TENTATIVE",
] as const;

export type FreeBusyTypes = typeof freeBusyTypes;
export type FreeBusyType = FreeBusyTypes[number];

export type IcsFreeBusyTimeValueDurationOrEnd =
  | { duration: IcsDuration; end?: never }
  | { duration?: never; end: Date };

export type IcsFreeBusyTimeValueBase = {
  start: Date;
};

export type IcsFreeBusyTimeValue = IcsFreeBusyTimeValueBase &
  IcsFreeBusyTimeValueDurationOrEnd;

export type IcsFreeBusyTime = {
  type?: FreeBusyType;
  values: IcsFreeBusyTimeValue[];
};

export type ConvertFreeBusyTime = ConvertLineType<IcsFreeBusyTime>;

export type ParseFreeBusyTime = ParseLineType<IcsFreeBusyTime>;

export type IcsFreeBusy<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  stamp: IcsDateObject;
  uid: string;
  start?: IcsDateObject;
  end?: IcsDateObject;
  organizer?: IcsOrganizer;
  url?: string;
  attendees?: IcsAttendee[];
  freeBusy?: IcsFreeBusyTime[];
  comment?: string;
  nonStandard?: Partial<TNonStandardValues>;
};

export type ParseFreeBusyOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertFreeBusy<
  TNonStandardValues extends NonStandardValuesGeneric
> = ConvertComponentType<
  IcsFreeBusy<TNonStandardValues>,
  ParseFreeBusyOptions<TNonStandardValues>
>;

export type ParseFreeBusy<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsFreeBusy<TNonStandardValues>,
    ParseFreeBusyOptions<TNonStandardValues>
  >;
