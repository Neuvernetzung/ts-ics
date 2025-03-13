import { convertNonStandardValues } from "@/lib/parse/nonStandardValues";
import { Line, NonStandardValuesGeneric } from "@/types";
import { z } from "zod";

it("Parse non standard values", () => {
  const nonStandardValue = "Test";
  const keyName = "handledProp";
  const propertyName = "X-HANDLED-PROP-123";

  const nonStandard: Record<string, Line> = {
    [propertyName]: { value: nonStandardValue },
  };

  const base: { nonStandard?: NonStandardValuesGeneric } = { nonStandard: {} };

  const result = convertNonStandardValues(base, nonStandard, {
    [keyName]: {
      name: propertyName,
      convert: (line) => line.value,
      schema: z.string(),
    },
  });

  expect(result.nonStandard?.[keyName]).toBe(nonStandardValue);
});

it("Parse unhandled non standard values", () => {
  const nonStandardValue = "Test";
  const keyName = "unhandledProp";
  const propertyName = "X-UNHANDLED-PROP";

  const nonStandard: Record<string, Line> = {
    [propertyName]: { value: nonStandardValue },
  };

  const base: { nonStandard?: NonStandardValuesGeneric } = { nonStandard: {} };

  const result = convertNonStandardValues(base, nonStandard);

  expect(result.nonStandard?.[keyName]).toBe(nonStandardValue);
});

it("Parse non standard values as number", () => {
  const nonStandardValue = "5";
  const nonStandardFinalValue = 5;
  const keyName = "handledProp";
  const propertyName = "X-HANDLED-PROP-123";

  const nonStandard: Record<string, Line> = {
    [propertyName]: { value: nonStandardValue },
  };

  const base: { nonStandard?: NonStandardValuesGeneric } = { nonStandard: {} };

  const result = convertNonStandardValues(base, nonStandard, {
    [keyName]: {
      name: propertyName,
      convert: (line) => parseInt(line.value),
      schema: z.number(),
    },
  });

  expect(result.nonStandard?.[keyName]).toBe(nonStandardFinalValue);
});

it("Parse non standard values with options", () => {
  const nonStandardValue = "Test";
  const options = { age: "25" };
  const keyName = "handledProp";
  const propertyName = "X-HANDLED-PROP-123";

  const nonStandard: Record<string, Line> = {
    [propertyName]: { value: nonStandardValue, options },
  };

  const base: { nonStandard?: NonStandardValuesGeneric } = { nonStandard: {} };

  const result = convertNonStandardValues(base, nonStandard, {
    [keyName]: {
      name: propertyName,
      convert: (line) => ({
        name: line.value,
        age: line.options?.age ? parseInt(line.options.age) : undefined,
      }),
      schema: z.object({ name: z.string(), age: z.number().optional() }),
    },
  });

  expect(result.nonStandard?.[keyName]).toStrictEqual({
    name: nonStandardValue,
    age: parseInt(options.age),
  });
});
