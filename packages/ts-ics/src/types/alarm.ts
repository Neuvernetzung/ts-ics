import type { IcsAttachment } from "./attachment";
import type { IcsAttendee } from "./attendee";
import type { IcsDuration } from "./duration";
import type { ConvertLinesType, ParseLinesType } from "./parse";
import type { IcsTimezone } from "./timezone";
import type { IcsTrigger } from "./trigger";

export type IcsAlarm = {
  action?: string;
  description?: string;
  trigger: IcsTrigger;
  attendees?: IcsAttendee[];
  duration?: IcsDuration;
  repeat?: number;
  summary?: string;
  attachments?: IcsAttachment[];
};

export type ParseAlarmOptions = {
  timezones?: IcsTimezone[];
};

export type ConvertAlarm = ConvertLinesType<IcsAlarm, ParseAlarmOptions>;

export type ParseAlarm = ParseLinesType<IcsAlarm, ParseAlarmOptions>;
