import type { DateObject, Duration, Trigger } from "@/types";

import { generateIcsDuration } from "./duration";
import { generateIcsTimeStamp } from "./timeStamp";
import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsTrigger = (trigger: Trigger) => {
  const options = generateIcsOptions(
    [
      trigger.options?.related && {
        key: "RELATED",
        value: trigger.options.related,
      },
    ].filter((v) => !!v)
  );

  if (trigger.type === "absolute") {
    return generateIcsTimeStamp("TRIGGER", trigger.value as DateObject);
  }

  if (trigger.type === "relative") {
    return generateIcsLine(
      "TRIGGER",
      generateIcsDuration(trigger.value as Duration),
      options
    );
  }
};
