import type { IcsAttachment } from "./attachment";
import type { IcsAttendee } from "./attendee";
import type { IcsDuration } from "./duration";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type { IcsTimezone } from "./timezone";
import type { IcsTrigger } from "./trigger";

export type IcsAlarm<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  action?: string;
  description?: string;
  trigger: IcsTrigger;
  attendees?: IcsAttendee[];
  duration?: IcsDuration;
  repeat?: number;
  summary?: string;
  attachments?: IcsAttachment[];
  nonStandard?: Partial<TNonStandardValues>;
};

export type ParseAlarmOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertAlarm<TNonStandardValues extends NonStandardValuesGeneric> =
  ConvertComponentType<
    IcsAlarm<TNonStandardValues>,
    ParseAlarmOptions<TNonStandardValues>
  >;

export type ParseAlarm<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsAlarm<TNonStandardValues>,
    ParseAlarmOptions<TNonStandardValues>
  >;
