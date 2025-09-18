import type { IcsTrigger } from "@/types";

import { generateIcsDuration } from "./duration";
import { generateIcsLine } from "../utils/addLine";
import { generateIcsOptions } from "../utils/generateOptions";
import { generateIcsUtcDateTime } from "./date";

export const generateIcsTrigger = (trigger: IcsTrigger) => {
  const options = generateIcsOptions(
    [
      trigger.options?.related && {
        key: "RELATED",
        value: trigger.options.related,
      },
    ].filter((v) => !!v)
  );

  if (trigger.type === "absolute") {
    return generateIcsLine(
      "TRIGGER",
      generateIcsUtcDateTime(trigger.value?.date)
    );
  }

  if (trigger.type === "relative") {
    return generateIcsLine(
      "TRIGGER",
      generateIcsDuration(trigger.value),
      options
    );
  }
};
