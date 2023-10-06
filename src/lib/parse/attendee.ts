import { Attendee, zAttendee } from "@/types/attendee";

import { replaceMailTo } from "./utils/replaceMailTo";

export const icsAttendeeToObject = (
  attendeeString: string,
  options?: Record<string, string>
): Attendee => ({
  email: replaceMailTo(attendeeString),
  delegatedFrom: options?.["DELEGATED-FROM"]
    ? replaceMailTo(options["DELEGATED-FROM"])
    : undefined,
  dir: options?.DIR,
  member: options?.MEMBER ? replaceMailTo(options.MEMBER) : undefined,
  name: options?.NAME,
  partstat: options?.PARTSTAT,
  role: options?.ROLE,
  sentBy: options?.["SENT-BY"] ? replaceMailTo(options["SENT-BY"]) : undefined,
});

export const parseIcsAttendee = (
  attendeeString: string,
  options?: Record<string, string>
): Attendee => zAttendee.parse(icsAttendeeToObject(attendeeString, options));
