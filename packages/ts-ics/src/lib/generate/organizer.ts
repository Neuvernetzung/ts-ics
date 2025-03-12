import type { IcsOrganizer } from "@/types/organizer";

import { generateIcsMail } from "./mail";
import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsOrganizer = (organizer: IcsOrganizer) => {
  const options = generateIcsOptions(
    [
      organizer.dir && { key: "DIR", value: `"${organizer.dir}"` },
      organizer.name && { key: "CN", value: organizer.name },
      organizer.sentBy && {
        key: "SENT-BY",
        value: generateIcsMail(organizer.sentBy),
      },
    ].filter((v) => !!v)
  );

  return generateIcsLine(
    "ORGANIZER",
    generateIcsMail(organizer.email),
    options
  );
};
