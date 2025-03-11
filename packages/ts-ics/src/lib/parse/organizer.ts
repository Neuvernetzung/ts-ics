import { type Organizer } from "@/types/organizer";

import { replaceMailTo } from "./utils/replaceMailTo";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";
import { Line } from "@/types";

export const icsOrganizerToObject = (
  line: Line,
  schema: StandardSchemaV1<Organizer> | undefined
): Organizer =>
  standardValidate(schema, {
    name: line.options?.CN,
    dir: line.options?.DIR,
    sentBy: line.options?.["SENT-BY"]
      ? replaceMailTo(line.options["SENT-BY"])
      : undefined,
    email: replaceMailTo(line.value),
  });
