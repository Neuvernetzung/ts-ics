import type { OrganizerLineToObject } from "@/types/organizer";

import { replaceMailTo } from "./utils/replaceMailTo";
import { standardValidate } from "./utils/standardValidate";

export const icsOrganizerToObject: OrganizerLineToObject = (schema, line) =>
  standardValidate(schema, {
    name: line.options?.CN,
    dir: line.options?.DIR,
    sentBy: line.options?.["SENT-BY"]
      ? replaceMailTo(line.options["SENT-BY"])
      : undefined,
    email: replaceMailTo(line.value),
  });
