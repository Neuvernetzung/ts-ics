import type { IcsAlarm } from "./alarm";
import type { IcsAttendee } from "./attendee";
import type { IcsDateObject } from "./date";
import type { IcsDuration } from "./duration";
import type { IcsOrganizer } from "./organizer";
import type { IcsRecurrenceRule } from "./recurrenceRule";
import type { IcsRecurrenceId } from "./recurrenceId";
import type { IcsEventStatusType } from "./status";
import type { IcsExceptionDates } from "./exceptionDate";
import type { IcsClassType } from "./class";
import type { IcsTimeTransparentType } from "./timeTransparent";
import type { IcsTimezone } from "./timezone";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";

export type IcsEventDurationOrEnd =
  | { duration: IcsDuration; end?: never }
  | { duration?: never; end: IcsDateObject };

export type IcsEventBase<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  summary: string;
  uid: string;
  created?: IcsDateObject;
  lastModified?: IcsDateObject;
  stamp: IcsDateObject;
  start: IcsDateObject;
  location?: string;
  description?: string;
  categories?: string[];
  exceptionDates?: IcsExceptionDates;
  recurrenceRule?: IcsRecurrenceRule;
  alarms?: IcsAlarm<TNonStandardValues>[];
  timeTransparent?: IcsTimeTransparentType;
  url?: string;
  geo?: string;
  class?: IcsClassType;
  organizer?: IcsOrganizer;
  priority?: string;
  sequence?: number;
  status?: IcsEventStatusType;
  attach?: string;
  recurrenceId?: IcsRecurrenceId;
  attendees?: IcsAttendee[];
  comment?: string;
  nonStandard?: Partial<TNonStandardValues>;
};

export type IcsEvent<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = IcsEventBase<TNonStandardValues> & IcsEventDurationOrEnd;

export type ParseEventOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertEvent<TNonStandardValues extends NonStandardValuesGeneric> =
  ConvertComponentType<
    IcsEvent<TNonStandardValues>,
    ParseEventOptions<TNonStandardValues>
  >;

export type ParseEvent<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsEvent<TNonStandardValues>,
    ParseEventOptions<TNonStandardValues>
  >;
