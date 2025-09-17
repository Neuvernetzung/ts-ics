import type { IcsAlarm } from "./alarm";
import type { IcsAttendee } from "../values/attendee";
import type { IcsDateObject } from "../values/date";
import type { IcsDuration } from "../values/duration";
import type { IcsOrganizer } from "../values/organizer";
import type { IcsRecurrenceRule } from "../values/recurrenceRule";
import type { IcsRecurrenceId } from "../values/recurrenceId";
import type { IcsEventStatusType } from "../values/status";
import type { IcsExceptionDates } from "../values/exceptionDate";
import type { IcsClassType } from "../values/class";
import type { IcsTimeTransparentType } from "../values/timeTransparent";
import type { IcsTimezone } from "./timezone";
import type { ConvertComponentType, ParseComponentType } from "../parse";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "../nonStandard/nonStandardValues";

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
  descriptionAltRep?: string;
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
