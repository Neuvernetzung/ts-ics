import {
  convertIcsFreeBusy,
  type NonStandardValuesGeneric,
  type IcsFreeBusy,
  type ParseFreeBusy,
  freeBusyTypes,
  type IcsFreeBusyTimeValueDurationOrEnd,
  type IcsFreeBusyTimeValueBase,
  type IcsFreeBusyTimeValue,
  type IcsFreeBusyTime,
} from "ts-ics";
import { z } from "zod";
import { zIcsDateObject } from "./date";
import { zIcsAttendee } from "./attendee";
import { zIcsClassType } from "./class";
import { zIcsOrganizer } from "./organizer";
import { zIcsDuration } from "./duration";

export const zIcsFreeBusyValueDurationOrEnd: z.ZodType<IcsFreeBusyTimeValueDurationOrEnd> =
  z.union([
    z.object({ duration: zIcsDuration, end: z.never().optional() }),
    z.object({ duration: z.never().optional(), end: z.date() }),
  ]);

export const zIcsFreeBusyValueBase: z.ZodType<IcsFreeBusyTimeValueBase> =
  z.object({
    start: z.date(),
  });

export const zIcsFreeBusyValue: z.ZodType<IcsFreeBusyTimeValue> =
  z.intersection(zIcsFreeBusyValueBase, zIcsFreeBusyValueDurationOrEnd);

export const zIcsFreeBusyTime: z.ZodType<IcsFreeBusyTime> = z.object({
  type: z.enum(freeBusyTypes).optional(),
  values: z.array(zIcsFreeBusyValue),
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsFreeBusy: z.ZodType<IcsFreeBusy<any>> = z.object({
  uid: z.string(),
  start: zIcsDateObject.optional(),
  end: zIcsDateObject.optional(),
  stamp: zIcsDateObject,
  url: z.string().url().optional(),
  class: zIcsClassType.optional(),
  organizer: zIcsOrganizer.optional(),
  attendees: z.array(zIcsAttendee).optional(),
  comment: z.string().optional(),
  freeBusy: z.array(zIcsFreeBusyTime).optional(),
  nonStandard: z.record(z.any()).optional(),
});

export const parseIcsFreeBusy = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseFreeBusy<T>>
): ReturnType<ParseFreeBusy<T>> => convertIcsFreeBusy(zIcsFreeBusy, ...props);
