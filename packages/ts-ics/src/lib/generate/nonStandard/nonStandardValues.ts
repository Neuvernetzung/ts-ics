import type {
  GenerateNonStandardValues,
  NonStandardValuesGeneric,
} from "@/types/nonStandard/nonStandardValues";
import { generateIcsLine } from "../utils/addLine";
import { generateIcsOptions } from "../utils/generateOptions";

export const generateNonStandardValues = <T extends NonStandardValuesGeneric>(
  nonStandardValues?: T,
  nonStandardOptions?: GenerateNonStandardValues<T>
): string => {
  if (!nonStandardValues) return "";

  let nonStandardValuesString = "";

  Object.entries(nonStandardValues).forEach(([key, value]) => {
    const option = nonStandardOptions?.[key];

    if (!option) {
      nonStandardValuesString += generateIcsLine(
        toUpperCase(key),
        value?.toString()
      );
      return;
    }

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

const toUpperCase = (prop: string): string => {
  let result = "X-";

  for (const char of prop) {
    if (char === char.toUpperCase()) {
      result += "-";
    }
    result += char.toUpperCase();
  }

  return result;
};
