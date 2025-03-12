import type { IcsAlarm } from "./alarm";
import type { IcsAttendee } from "./attendee";
import type { IcsDateObject } from "./date";
import type { IcsDuration } from "./duration";
import type { IcsOrganizer } from "./organizer";
import type { IcsRecurrenceRule } from "./recurrenceRule";
import type { IcsRecurrenceId } from "./recurrenceId";
import type { IcsStatusType } from "./status";
import type { IcsExceptionDates } from "./exceptionDate";
import type { IcsClassType } from "./class";
import type { IcsTimeTransparentType } from "./timeTransparent";
import type { IcsTimezone } from "./timezone";
import type { ConvertLinesType, ParseLinesType } from "./parse";

export type IcsEventDurationOrEnd =
  | { duration: IcsDuration; end?: never }
  | { duration?: never; end: IcsDateObject };

export type IcsEventBase = {
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
  alarms?: IcsAlarm[];
  timeTransparent?: IcsTimeTransparentType;
  url?: string;
  geo?: string;
  class?: IcsClassType;
  organizer?: IcsOrganizer;
  priority?: string;
  sequence?: number;
  status?: IcsStatusType;
  attach?: string;
  recurrenceId?: IcsRecurrenceId;
  attendees?: IcsAttendee[];
  comment?: string;
};

export type IcsEvent = IcsEventBase & IcsEventDurationOrEnd;

export type ParseEventOptions = { timezones?: IcsTimezone[] };

export type ConvertEvent = ConvertLinesType<IcsEvent, ParseEventOptions>;

export type ParseEvent = ParseLinesType<IcsEvent, ParseEventOptions>;
