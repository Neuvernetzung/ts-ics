import type { IcsDateObject, IcsDuration, IcsTrigger } from "@/types";

import { generateIcsDuration } from "./duration";
import { generateIcsTimeStamp } from "./timeStamp";
import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

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
    return generateIcsTimeStamp("TRIGGER", trigger.value as IcsDateObject);
  }

  if (trigger.type === "relative") {
    return generateIcsLine(
      "TRIGGER",
      generateIcsDuration(trigger.value as IcsDuration),
      options
    );
  }
};
