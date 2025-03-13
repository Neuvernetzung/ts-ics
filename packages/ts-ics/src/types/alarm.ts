import type { IcsAttachment } from "./attachment";
import type { IcsAttendee } from "./attendee";
import type { IcsDuration } from "./duration";
import type { ConvertComponentType, ParseComponentType } from "./parse";
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

export type ConvertAlarm = ConvertComponentType<IcsAlarm, ParseAlarmOptions>;

export type ParseAlarm = ParseComponentType<IcsAlarm, ParseAlarmOptions>;
