import { type Organizer, zOrganizer } from "@/types/organizer";

import { replaceMailTo } from "./utils/replaceMailTo";

export const icsOrganizerToObject = (
  organizerString: string,
  options?: Record<string, string>,
): Organizer => ({
  name: options?.CN,
  dir: options?.DIR,
  sentBy: options?.["SENT-BY"] ? replaceMailTo(options["SENT-BY"]) : undefined,
  email: replaceMailTo(organizerString),
});

export const parseIcsOrganizer = (
  organizerString: string,
  options?: Record<string, string>,
): Organizer =>
  zOrganizer.parse(icsOrganizerToObject(organizerString, options));
