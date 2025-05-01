import type { IcsDateObject } from "./date";
import type { IcsDuration } from "./duration";
import type { IcsTimezone } from "./timezone";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import type { IcsClassType } from "./class";
import type { IcsOrganizer } from "./organizer";
import type { IcsRecurrenceId } from "./recurrenceId";
import type { IcsTodoStatusType } from "./status";
import type { IcsRecurrenceRule } from "./recurrenceRule";
import type { IcsAttendee } from "./attendee";
import type { IcsExceptionDates } from "./exceptionDate";

export type IcsTodoDurationOrEnd =
  | { start: IcsDateObject; duration: IcsDuration; due?: never }
  | { start?: never; duration?: never; due: IcsDateObject };

export type IcsTodoBase<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  stamp: IcsDateObject;
  uid: string;
  class?: IcsClassType;
  completed?: IcsDateObject;
  created?: IcsDateObject;
  description?: string;
  geo?: string;
  lastModified?: IcsDateObject;
  location?: string;
  organizer?: IcsOrganizer;
  percentComplete?: number;
  priority?: string;
  recurrenceId?: IcsRecurrenceId;
  sequence?: number;
  status?: IcsTodoStatusType;
  summary?: string;
  url?: string;
  recurrenceRule?: IcsRecurrenceRule;
  attach?: string;
  attendees?: IcsAttendee[];
  categories?: string[];
  comment?: string;
  exceptionDates?: IcsExceptionDates;
  nonStandard?: Partial<TNonStandardValues>;
};

export type IcsTodo<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = IcsTodoBase<TNonStandardValues> & IcsTodoDurationOrEnd;

export type ParseTodoOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertTodo<TNonStandardValues extends NonStandardValuesGeneric> =
  ConvertComponentType<
    IcsTodo<TNonStandardValues>,
    ParseTodoOptions<TNonStandardValues>
  >;

export type ParseTodo<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsTodo<TNonStandardValues>,
    ParseTodoOptions<TNonStandardValues>
  >;
