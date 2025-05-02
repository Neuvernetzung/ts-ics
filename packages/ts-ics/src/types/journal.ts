import type { IcsDateObject } from "./date";
import type { IcsTimezone } from "./timezone";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import type { IcsClassType } from "./class";
import type { IcsOrganizer } from "./organizer";
import type { IcsRecurrenceId } from "./recurrenceId";
import type { IcsJournalStatusType } from "./status";
import type { IcsRecurrenceRule } from "./recurrenceRule";
import type { IcsAttendee } from "./attendee";
import type { IcsExceptionDates } from "./exceptionDate";

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
