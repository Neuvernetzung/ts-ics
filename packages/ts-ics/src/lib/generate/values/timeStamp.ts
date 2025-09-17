import type { IcsDateObject, IcsTimezone } from "@/types";

import {
  generateIcsDate,
  generateIcsLocalDateTime,
  generateIcsUtcDateTime,
} from "./date";
import { generateIcsLine } from "../utils/addLine";
import {
  generateIcsOptions,
  type GenerateIcsOptionsProps,
} from "../utils/generateOptions";

type GenerateIcsTimeStampOptions = {
  timezones?: IcsTimezone[];
  forceUtc?: boolean;
};

export const generateIcsTimeStamp = (
  icsKey: string,
  dateObject: IcsDateObject,
  lineOptions: GenerateIcsOptionsProps = [],
  options?: GenerateIcsTimeStampOptions
) => {
  const icsOptions = generateIcsOptions(
    [
      dateObject.type && { key: "VALUE", value: dateObject.type },
      dateObject.local &&
        !options?.forceUtc && { key: "TZID", value: dateObject.local.timezone },
      ...lineOptions,
    ].filter((v) => !!v)
  );

  const value =
    dateObject.type === "DATE"
      ? generateIcsDate(dateObject.date)
      : dateObject.local && !options?.forceUtc
      ? generateIcsLocalDateTime(
          dateObject.date,
          dateObject.local,
          options?.timezones
        )
      : generateIcsUtcDateTime(dateObject.date);

  return generateIcsLine(icsKey, value, icsOptions);
};
