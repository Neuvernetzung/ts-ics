import type { IcsDateObject } from "../values/date";
import type { IcsTimezone } from "./timezone";
import type { ConvertComponentType, ParseComponentType } from "../parse";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "../nonStandard/nonStandardValues";
import type { IcsClassType } from "../values/class";
import type { IcsOrganizer } from "../values/organizer";
import type { IcsRecurrenceId } from "../values/recurrenceId";
import type { IcsJournalStatusType } from "../values/status";
import type { IcsRecurrenceRule } from "../values/recurrenceRule";
import type { IcsAttendee } from "../values/attendee";
import type { IcsExceptionDates } from "../values/exceptionDate";

export type IcsJournal<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  stamp: IcsDateObject;
  uid: string;
  class?: IcsClassType;
  created?: IcsDateObject;
  start?: IcsDateObject;
  lastModified?: IcsDateObject;
  organizer?: IcsOrganizer;
  recurrenceId?: IcsRecurrenceId;
  sequence?: number;
  status?: IcsJournalStatusType;
  summary?: string;
  url?: string;
  recurrenceRule?: IcsRecurrenceRule;
  attach?: string;
  attendees?: IcsAttendee[];
  categories?: string[];
  comment?: string;
  description?: string;
  geo?: string;
  exceptionDates?: IcsExceptionDates;
  nonStandard?: Partial<TNonStandardValues>;
};

export type ParseJournalOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertJournal<
  TNonStandardValues extends NonStandardValuesGeneric
> = ConvertComponentType<
  IcsJournal<TNonStandardValues>,
  ParseJournalOptions<TNonStandardValues>
>;

export type ParseJournal<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsJournal<TNonStandardValues>,
    ParseJournalOptions<TNonStandardValues>
  >;
