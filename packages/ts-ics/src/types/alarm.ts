import { type Attachment } from "./attachment";
import { type Attendee } from "./attendee";
import { type Duration } from "./duration";
import { LinesToObject, ParseLinesType } from "./parse";
import { VTimezone } from "./timezone";
import { type VEventTrigger } from "./trigger";

export type VAlarm = {
  action?: string;
  description?: string;
  trigger: VEventTrigger;
  attendees?: Attendee[];
  duration?: Duration;
  repeat?: number;
  summary?: string;
  attachments?: Attachment[];
};

export type ParseAlarmOptions = {
  timezones?: VTimezone[];
};

export type AlarmLinesToObject = LinesToObject<VAlarm, [ParseAlarmOptions]>;

export type ParseAlarm = ParseLinesType<VAlarm, [ParseAlarmOptions]>;
