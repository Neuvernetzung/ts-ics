import { VTIMEZONE_PROP_TO_KEYS } from "@/constants/keys/timezoneProp";
import type { DateObject, RecurrenceRule } from "@/types";
import type { VTimezoneProp } from "@/types/timezone";

import { generateIcsDateTime } from "./date";
import { generateIcsRecurrenceRule } from "./recurrenceRule";
import { generateIcsTimeStamp } from "./timeStamp";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "./utils/addLine";
import { getKeys } from "./utils/getKeys";

export const generateIcsTimezoneProp = (timezoneProp: VTimezoneProp) => {
  const timezonePropKeys = getKeys(timezoneProp);

  let icsString = "";

  icsString += getIcsStartLine(timezoneProp.type);

  timezonePropKeys.forEach((key) => {
    if (key === "type") return;

    const icsKey = VTIMEZONE_PROP_TO_KEYS[key];

    if (!icsKey) return;

    const value = timezoneProp[key];

    if (key === "start") {
      icsString += generateIcsLine(icsKey, generateIcsDateTime(value as Date));
      return;
    }

    if (key === "recurrenceRule") {
      icsString += generateIcsRecurrenceRule(value as RecurrenceRule);
      return;
    }

    if (key === "recurrenceDate") {
      icsString += generateIcsTimeStamp(icsKey, value as DateObject);
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  icsString += getIcsEndLine(timezoneProp.type);

  return icsString;
};
