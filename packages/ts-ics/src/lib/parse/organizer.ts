import { type Organizer } from "@/types/organizer";

import { replaceMailTo } from "./utils/replaceMailTo";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export const icsOrganizerToObject = (
  organizerString: string,
  schema?: StandardSchemaV1<Organizer>,
  options?: Record<string, string>
): Organizer =>
  standardValidate(schema, {
    name: options?.CN,
    dir: options?.DIR,
    sentBy: options?.["SENT-BY"]
      ? replaceMailTo(options["SENT-BY"])
      : undefined,
    email: replaceMailTo(organizerString),
  });
