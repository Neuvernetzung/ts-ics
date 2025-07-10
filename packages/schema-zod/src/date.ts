import {
  type IcsDateObject,
  dateObjectTypes,
  convertIcsDateTime,
  convertIcsDate,
  type ParseDate,
} from "ts-ics";
import { z } from "zod";

export const zIcsDateObjectTzProps = z.object({
  date: z.date(),
  timezone: z.string(),
  tzoffset: z.string(),
});

export const zIcsDateObject: z.ZodType<IcsDateObject, IcsDateObject> = z.object(
  {
    date: z.date(),
    type: z.enum(dateObjectTypes).optional(),
    local: zIcsDateObjectTzProps.optional(),
  }
);

export const parseIcsDate: ParseDate = (...props) =>
  convertIcsDate(z.date(), ...props);

export const parseIcsDateTime: ParseDate = (...props) =>
  convertIcsDateTime(z.date(), ...props);
