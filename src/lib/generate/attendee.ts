import compact from "lodash/compact";

import type { Attendee } from "@/types/attendee";

import { generateIcsMail } from "./mail";
import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsAttendee = (attendee: Attendee, key: string) => {
  const options = generateIcsOptions(
    compact([
      attendee.dir && { key: "DIR", value: `"${attendee.dir}"` },
      attendee.delegatedFrom && {
        key: "DELEGATED-FROM",
        value: generateIcsMail(attendee.delegatedFrom, true),
      },
      attendee.member && {
        key: "MEMBER",
        value: generateIcsMail(attendee.member, true),
      },
      attendee.role && { key: "ROLE", value: attendee.role },
      attendee.name && { key: "CN", value: attendee.name },
      attendee.partstat && { key: "PARTSTAT", value: attendee.partstat },
      attendee.role && { key: "ROLE", value: attendee.role },
      attendee.sentBy && {
        key: "SENT-BY",
        value: generateIcsMail(attendee.sentBy, true),
      },
    ]),
  );

  return generateIcsLine(key, generateIcsMail(attendee.email), options);
};
