import { VTIMEZONE_PROP_TO_KEYS } from "@/constants/keys/timezoneProp";
import type { IcsTimezoneProp } from "@/types/components/timezoneProp";

import { generateIcsUtcDateTime } from "../values/date";
import { generateIcsRecurrenceRule } from "../values/recurrenceRule";
import { generateIcsTimeStamp } from "../values/timeStamp";
import { generateIcsLine } from "../utils/addLine";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import {
  _generateIcsComponent,
  type GenerateIcsComponentProps,
} from "./_component";

export const generateIcsTimezoneProp = <T extends NonStandardValuesGeneric>(
  timezoneProp: IcsTimezoneProp,
  options?: Pick<
    GenerateIcsComponentProps<IcsTimezoneProp, T>,
    "nonStandard" | "skipFormatLines"
  >
) =>
  _generateIcsComponent(timezoneProp, {
    icsComponent: timezoneProp.type,
    icsKeyMap: VTIMEZONE_PROP_TO_KEYS,
    generateValues: {
      start: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsUtcDateTime(value)),
      recurrenceRule: ({ value }) => generateIcsRecurrenceRule(value),
      recurrenceDate: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value),
    },
    omitGenerateKeys: ["type"],
    nonStandard: options?.nonStandard,
    skipFormatLines: options?.skipFormatLines,
  });
