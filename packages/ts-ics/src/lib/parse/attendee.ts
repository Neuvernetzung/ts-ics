import { type Attendee, type AttendeePartStatusType } from "@/types/attendee";

import { replaceMailTo } from "./utils/replaceMailTo";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";
import { Line } from "@/types";

export const icsAttendeeToObject = (
  line: Line,
  schema: StandardSchemaV1<Attendee> | undefined
): Attendee =>
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
    partstat: line.options?.PARTSTAT as AttendeePartStatusType,
    role: line.options?.ROLE,
    sentBy: line.options?.["SENT-BY"]
      ? replaceMailTo(line.options["SENT-BY"])
      : undefined,
  });
