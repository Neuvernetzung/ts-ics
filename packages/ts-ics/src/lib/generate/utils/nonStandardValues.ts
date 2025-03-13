import {
  GenerateNonStandardValue,
  GenerateNonStandardValues,
  NonStandardValuesGeneric,
} from "@/types/nonStandardValues";
import { generateIcsLine } from "./addLine";
import { generateIcsOptions } from "./generateOptions";

export const generateNonStandardValues = <
  TNonStandardValues extends NonStandardValuesGeneric
>(
  nonStandardValues?: NonStandardValuesGeneric,
  nonStandardOptions?: GenerateNonStandardValues<TNonStandardValues>
): string => {
  if (!nonStandardValues) return "";

  let nonStandardValuesString = "";

  Object.entries(nonStandardValues).map(([key, value]) => {
    const option = nonStandardOptions?.[key];

    if (!option) return;

    const line = option.generate(value);

    if (!line) return;

    nonStandardValuesString += generateIcsLine(
      option.name,
      line.value,
      line.options
        ? generateIcsOptions(
            Object.entries(line.options).map(([key, value]) => ({ key, value }))
          )
        : undefined
    );
  });

  return nonStandardValuesString;
};
