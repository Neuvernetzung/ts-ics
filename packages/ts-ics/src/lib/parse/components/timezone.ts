import { VTIMEZONE_OBJECT_KEY } from "@/constants";
import { VTIMEZONE_TO_OBJECT_KEYS } from "@/constants/keys/timezone";
import type { ConvertTimezone, IcsTimezone } from "@/types/components/timezone";

import { convertIcsDateTime } from "../values/date";
import { convertIcsTimezoneProp } from "../components/timezoneProp";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { _convertIcsComponent } from "./_component";

export const convertIcsTimezone = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertTimezone<T>>
): ReturnType<ConvertTimezone<T>> => {
  const [schema, rawTimezoneString, options] = args;

  return _convertIcsComponent<IcsTimezone<T>, T, "DAYLIGHT" | "STANDARD">(
    schema,
    rawTimezoneString,
    {
      icsComponent: VTIMEZONE_OBJECT_KEY,
      objectKeyMap: VTIMEZONE_TO_OBJECT_KEYS,
      convertValues: {
        lastModified: ({ line }) => convertIcsDateTime(undefined, line),
      },
      childComponents: {
        props: {
          icsComponent: ["DAYLIGHT", "STANDARD"],
          convert: (rawTimezonePropString) =>
            convertIcsTimezoneProp(undefined, rawTimezonePropString, {
              nonStandard: options?.nonStandard,
              timezones: options?.timezones,
            }),
        },
      },
      nonStandard: options?.nonStandard,
      timezones: options?.timezones,
    }
  );
};
