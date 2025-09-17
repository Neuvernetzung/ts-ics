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
import { zIcsDateObject } from "../values/date";
import { zIcsAttendee } from "../values/attendee";
import { zIcsClassType } from "../values/class";
import { zIcsOrganizer } from "../values/organizer";
import { zIcsDuration } from "../values/duration";

export const zIcsFreeBusyValueDurationOrEnd: z.ZodType<
  IcsFreeBusyTimeValueDurationOrEnd,
  IcsFreeBusyTimeValueDurationOrEnd
> = z.union([
  z.object({ duration: zIcsDuration, end: z.never().optional() }),
  z.object({ duration: z.never().optional(), end: z.date() }),
]);

export const zIcsFreeBusyValueBase: z.ZodType<
  IcsFreeBusyTimeValueBase,
  IcsFreeBusyTimeValueBase
> = z.object({
  start: z.date(),
});

export const zIcsFreeBusyValue: z.ZodType<
  IcsFreeBusyTimeValue,
  IcsFreeBusyTimeValue
> = z.intersection(zIcsFreeBusyValueBase, zIcsFreeBusyValueDurationOrEnd);

export const zIcsFreeBusyTime: z.ZodType<IcsFreeBusyTime, IcsFreeBusyTime> =
  z.object({
    type: z.enum(freeBusyTypes).optional(),
    values: z.array(zIcsFreeBusyValue),
  });

export const zIcsFreeBusy: z.ZodType<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsFreeBusy<any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsFreeBusy<any>
> = z.object({
  uid: z.string(),
  start: zIcsDateObject.optional(),
  end: zIcsDateObject.optional(),
  stamp: zIcsDateObject,
  url: z.url().optional(),
  class: zIcsClassType.optional(),
  organizer: zIcsOrganizer.optional(),
  attendees: z.array(zIcsAttendee).optional(),
  comment: z.string().optional(),
  freeBusy: z.array(zIcsFreeBusyTime).optional(),
  nonStandard: z.record(z.string(), z.any()).optional(),
});

export const parseIcsFreeBusy = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseFreeBusy<T>>
): ReturnType<ParseFreeBusy<T>> => convertIcsFreeBusy(zIcsFreeBusy, ...props);
