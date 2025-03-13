import { Line } from "@/types";
import { ParseNonStandardValue } from "@/types/nonStandardValues";
import { standardValidate } from "./standardValidate";

export const convertNonStandardValues = <
  T extends { nonStandard?: Record<string, any> },
  TNonStandardValues extends Record<string, any>
>(
  base: T,
  nonStandardValues: Record<string, Line>,
  nonStandardOptions: {
    [K in keyof TNonStandardValues]: ParseNonStandardValue<
      TNonStandardValues[K]
    >;
  }
) => {
  if (!nonStandardOptions || !nonStandardValues) return base;

  const finalNonStandardValues: Record<string, any> = {};

  Object.entries(nonStandardValues).forEach(([property, line]) => {
    const nonStandardOption: [string, ParseNonStandardValue] | undefined =
      Object.entries(nonStandardOptions).find(
        ([_, option]) => option.name === property
      );

    if (!nonStandardOption) return;

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
