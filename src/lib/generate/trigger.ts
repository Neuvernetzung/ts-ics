import compact from "lodash/compact";

import type { DateObject, VEventDuration, VEventTrigger } from "@/types";

import { generateIcsDuration } from "./duration";
import { generateIcsTimeStamp } from "./timeStamp";
import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsTrigger = (trigger: VEventTrigger) => {
  const options = generateIcsOptions(
    compact([
      trigger.options?.related && {
        key: "RELATED",
        value: trigger.options.related,
      },
    ]),
  );

  if (trigger.type === "absolute") {
    return generateIcsTimeStamp("TRIGGER", trigger.value as DateObject);
  }

  if (trigger.type === "relative") {
    return generateIcsLine(
      "TRIGGER",
      generateIcsDuration(trigger.value as VEventDuration),
      options,
    );
  }
};
