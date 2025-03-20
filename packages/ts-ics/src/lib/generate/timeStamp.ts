import type { IcsDateObject } from "@/types";

import { generateIcsDate, generateIcsDateTime } from "./date";
import { generateIcsLine } from "./utils/addLine";
import {
  generateIcsOptions,
  type GenerateIcsOptionsProps,
} from "./utils/generateOptions";

export const generateIcsTimeStamp = (
  icsKey: string,
  dateObject: IcsDateObject,
  options: GenerateIcsOptionsProps = []
) => {
  const value =
    dateObject.type === "DATE"
      ? generateIcsDate(dateObject.date)
      : generateIcsDateTime(dateObject.local?.date || dateObject.date);

  const icsOptions = generateIcsOptions(
    [
      dateObject.type && { key: "VALUE", value: dateObject.type },
      dateObject.local && { key: "TZID", value: dateObject.local.timezone },
      ...options,
    ].filter((v) => !!v)
  );

  return generateIcsLine(icsKey, value, icsOptions);
};
