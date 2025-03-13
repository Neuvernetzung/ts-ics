import { VTIMEZONE_TO_KEYS } from "@/constants/keys/timezone";
import type { IcsTimezone } from "@/types/timezone";

import { generateIcsDateTime } from "./date";
import { generateIcsTimezoneProp } from "./timezoneProp";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "./utils/addLine";
import { getKeys } from "./utils/getKeys";
import { generateNonStandardValues } from "./nonStandardValues";
import {
  GenerateNonStandardValues,
  NonStandardValuesGeneric,
} from "@/types/nonStandardValues";

export const generateIcsTimezone = <T extends NonStandardValuesGeneric>(
  timezone: IcsTimezone,
  options?: { nonStandard?: GenerateNonStandardValues<T> }
) => {
  const timezoneKeys = getKeys(timezone);

  let icsString = "";

  icsString += getIcsStartLine("VTIMEZONE");

  timezoneKeys.forEach((key) => {
    if (key === "props") return;

    if (key === "nonStandard") {
      icsString += generateNonStandardValues(
        timezone[key],
        options?.nonStandard
      );
      return;
    }

    const icsKey = VTIMEZONE_TO_KEYS[key];

    if (!icsKey) return;

    const value = timezone[key];

    if (key === "lastModified") {
      icsString += generateIcsLine(icsKey, generateIcsDateTime(value as Date));
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (timezone.props && timezone.props.length > 0) {
    timezone.props.forEach((timezone) => {
      icsString += generateIcsTimezoneProp(timezone);
    });
  }

  icsString += getIcsEndLine("VTIMEZONE");

  return icsString;
};
