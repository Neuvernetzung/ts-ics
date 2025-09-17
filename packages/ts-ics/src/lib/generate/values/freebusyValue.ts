import type { IcsFreeBusyTime } from "@/types/freebusy";
import { generateIcsLine } from "../utils/addLine";
import { generateIcsOptions } from "../utils/generateOptions";
import { generateIcsUtcDateTime } from "./date";
import { generateIcsDuration } from "./duration";

export const generateIcsFreeBusyTime = (
  freeBusy: IcsFreeBusyTime,
  key: string
) => {
  const value: string = freeBusy.values
    .map(
      (freeBusy) =>
        `${generateIcsUtcDateTime(freeBusy.start)}/${
          freeBusy.end
            ? generateIcsUtcDateTime(freeBusy.end)
            : generateIcsDuration(freeBusy.duration)
        }`
    )
    .join(",");

  const icsOptions = generateIcsOptions(
    [freeBusy.type && { key: "FBTYPE", value: freeBusy.type }].filter(
      (v) => !!v
    )
  );

  return generateIcsLine(key, value, icsOptions);
};
