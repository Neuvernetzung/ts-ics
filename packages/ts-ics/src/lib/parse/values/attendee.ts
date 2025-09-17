import type {
  ConvertAttendee,
  IcsAttendeePartStatusType,
} from "@/types/attendee";

import { replaceMailTo } from "../utils/replaceMailTo";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsAttendee: ConvertAttendee = (schema, line) =>
  standardValidate(schema, {
    email: replaceMailTo(line.value),
    delegatedFrom: line.options?.["DELEGATED-FROM"]
      ? replaceMailTo(line.options?.["DELEGATED-FROM"])
      : undefined,
    dir: line.options?.DIR,
    member: line.options?.MEMBER
      ? replaceMailTo(line.options.MEMBER)
      : undefined,
    name: line.options?.CN,
    partstat: line.options?.PARTSTAT as IcsAttendeePartStatusType,
    role: line.options?.ROLE,
    sentBy: line.options?.["SENT-BY"]
      ? replaceMailTo(line.options["SENT-BY"])
      : undefined,
    rsvp: line.options?.RSVP
      ? line.options?.RSVP === "TRUE"
        ? true
        : line.options?.RSVP === "FALSE"
        ? false
        : undefined
      : undefined,
  });
