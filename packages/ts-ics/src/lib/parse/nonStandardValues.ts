import type { Line } from "@/types";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValue,
  ParseNonStandardValues,
} from "@/types/nonStandardValues";
import { standardValidate } from "./utils/standardValidate";

export const convertNonStandardValues = <
  T extends { nonStandard?: NonStandardValuesGeneric },
  TNonStandardValues extends NonStandardValuesGeneric
>(
  base: T,
  nonStandardValues: Record<string, Line>,
  nonStandardOptions?: ParseNonStandardValues<TNonStandardValues>
) => {
  if (!nonStandardValues) return base;

  const finalNonStandardValues: NonStandardValuesGeneric = {};

  Object.entries(nonStandardValues).forEach(([property, line]) => {
    const nonStandardOption: [string, ParseNonStandardValue] | undefined =
      Object.entries(nonStandardOptions || {}).find(
        ([_, option]) => option.name === property
      );

    if (!nonStandardOption) {
      finalNonStandardValues[toCamelCase(property)] = line.value;
      return;
    }

    const value = nonStandardOption[1].convert(line);

    const schema = nonStandardOption[1].schema;

    if (!schema) {
      finalNonStandardValues[nonStandardOption[0]] = value;
      return;
    }

    finalNonStandardValues[nonStandardOption[0]] = standardValidate(
      schema,
      value
    );
  });

  base.nonStandard = finalNonStandardValues;

  return base as T & { nonStandard: TNonStandardValues };
};

const toCamelCase = (prop: string): string => {
  const propWithoutPrefix = prop.startsWith("X-") ? prop.slice(2) : prop;

  let result = "";
  let capitalizeNext = false;

  for (const char of propWithoutPrefix) {
    if (char === "-") {
      capitalizeNext = true;
    } else {
      result += capitalizeNext ? char.toUpperCase() : char.toLowerCase();
      capitalizeNext = false;
    }
  }

  return result;
};
