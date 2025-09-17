import { VTIMEZONE_TO_KEYS } from "@/constants/keys/timezone";
import type { IcsTimezone } from "@/types/components/timezone";

import { generateIcsUtcDateTime } from "../values/date";
import { generateIcsTimezoneProp } from "./timezoneProp";
import { generateIcsLine } from "../utils/addLine";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import {
  _generateIcsComponent,
  type GenerateIcsComponentProps,
} from "./_component";
import { VTIMEZONE_OBJECT_KEY } from "@/constants";

export const generateIcsTimezone = <T extends NonStandardValuesGeneric>(
  timezone: IcsTimezone,
  options?: Pick<
    GenerateIcsComponentProps<IcsTimezone, T>,
    "nonStandard" | "skipFormatLines"
  >
) =>
  _generateIcsComponent(timezone, {
    icsComponent: VTIMEZONE_OBJECT_KEY,
    icsKeyMap: VTIMEZONE_TO_KEYS,
    generateValues: {
      lastModified: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsUtcDateTime(value)),
    },
    childComponents: {
      props: (timezoneProp) =>
        generateIcsTimezoneProp(timezoneProp, {
          nonStandard: options?.nonStandard,
          skipFormatLines: true,
        }),
    },
    nonStandard: options?.nonStandard,
    skipFormatLines: options?.skipFormatLines,
  });
