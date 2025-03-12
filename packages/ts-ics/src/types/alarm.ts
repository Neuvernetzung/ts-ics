import type { Attachment } from "./attachment";
import type { Attendee } from "./attendee";
import type { Duration } from "./duration";
import type { ConvertLinesType, ParseLinesType } from "./parse";
import type { VTimezone } from "./timezone";
import type { Trigger } from "./trigger";

export type VAlarm = {
  action?: string;
  description?: string;
  trigger: Trigger;
  attendees?: Attendee[];
  duration?: Duration;
  repeat?: number;
  summary?: string;
  attachments?: Attachment[];
};

export type ParseAlarmOptions = {
  timezones?: VTimezone[];
};

export type ConvertAlarm = ConvertLinesType<VAlarm, ParseAlarmOptions>;

export type ParseAlarm = ParseLinesType<VAlarm, ParseAlarmOptions>;
