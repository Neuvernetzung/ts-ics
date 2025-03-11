import { type Attendee, type AttendeePartStatusType } from "@/types/attendee";

import { replaceMailTo } from "./utils/replaceMailTo";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsAttendeeToObject = (
  attendeeString: string,
  schema?: StandardSchemaV1<Attendee>,
  options?: Record<string, string>
): Attendee =>
  standardValidate(schema, {
    email: replaceMailTo(attendeeString),
    delegatedFrom: options?.["DELEGATED-FROM"]
      ? replaceMailTo(options["DELEGATED-FROM"])
      : undefined,
    dir: options?.DIR,
    member: options?.MEMBER ? replaceMailTo(options.MEMBER) : undefined,
    name: options?.CN,
    partstat: options?.PARTSTAT as AttendeePartStatusType,
    role: options?.ROLE,
    sentBy: options?.["SENT-BY"]
      ? replaceMailTo(options["SENT-BY"])
      : undefined,
  });
