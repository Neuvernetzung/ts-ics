import compact from "lodash/compact";

import type { Organizer } from "@/types/organizer";

import { generateIcsMail } from "./mail";
import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsOrganizer = (organizer: Organizer) => {
  const options = generateIcsOptions(
    compact([
      organizer.dir && { key: "DIR", value: `"${organizer.dir}"` },
      organizer.name && { key: "CN", value: organizer.name },
      organizer.sentBy && {
        key: "SENT-BY",
        value: generateIcsMail(organizer.sentBy),
      },
    ])
  );

  return generateIcsLine(
    "ORGANIZER",
    generateIcsMail(organizer.email),
    options
  );
};
