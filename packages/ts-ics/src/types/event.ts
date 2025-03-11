import { type VAlarm } from "./alarm";
import { type Attendee } from "./attendee";
import { type DateObject } from "./date";
import { type Duration } from "./duration";
import { type Organizer } from "./organizer";
import { type RecurrenceRule } from "./recurrenceRule";
import { type RecurrenceId } from "./recurrenceId";
import { type StatusType } from "./status";
import { type ExceptionDates } from "./exceptionDate";
import { type ClassType } from "./class";
import { type TimeTransparentType } from "./timeTransparent";
import { VTimezone } from "./timezone";
import { LinesToObject, ParseLinesType } from "./parse";

export type DurationOrEnd =
  | { duration: Duration; end?: never }
  | { duration?: never; end: DateObject };

export type VEventBase = {
  summary: string;
  uid: string;
  created?: DateObject;
  lastModified?: DateObject;
  stamp: DateObject;
  start: DateObject;
  location?: string;
  description?: string;
  categories?: string[];
  exceptionDates?: ExceptionDates;
  recurrenceRule?: RecurrenceRule;
  alarms?: VAlarm[];
  timeTransparent?: TimeTransparentType;
  url?: string;
  geo?: string;
  class?: ClassType;
  organizer?: Organizer;
  priority?: string;
  sequence?: number;
  status?: StatusType;
  attach?: string;
  recurrenceId?: RecurrenceId;
  attendees?: Attendee[];
  comment?: string;
};

export type VEvent = VEventBase & DurationOrEnd;

export type ParseEventOptions = { timezones?: VTimezone[] };

export type EventLinesToObject = LinesToObject<VEvent, [ParseEventOptions]>;

export type ParseEvent = ParseLinesType<VEvent, [ParseEventOptions]>;
