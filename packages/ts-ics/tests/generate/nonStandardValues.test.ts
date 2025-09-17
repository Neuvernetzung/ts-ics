import { generateNonStandardValues } from "@/lib/generate/nonStandard/nonStandardValues";

it("Generate non standard values", () => {
  const nonStandardValue = "Test";
  const keyName = "handledProp";
  const propertyName = "X-HANDLED-PROP-123";

  const nonStandard = {
    [keyName]: nonStandardValue,
  } as const;

  const result = generateNonStandardValues(nonStandard, {
    [keyName]: {
      name: propertyName,
      generate: (value) => ({
        value,
      }),
    },
  });

  expect(result).toContain(`${propertyName}:${nonStandardValue}`);
});

it("Generate unhandled non standard values", () => {
  const nonStandardValue = "Test";
  const keyName = "unhandledProp";
  const propertyName = "X-UNHANDLED-PROP";

  const nonStandard = {
    [keyName]: nonStandardValue,
  } as const;

  const result = generateNonStandardValues(nonStandard);

  expect(result).toContain(`${propertyName}:${nonStandardValue}`);
});

it("Generate non standard values as number", () => {
  const nonStandardValue = 5;
  const keyName = "handledProp";
  const propertyName = "X-HANDLED-PROP-123";

  const nonStandard = {
    [keyName]: nonStandardValue,
  } as const;

  const result = generateNonStandardValues(nonStandard, {
    [keyName]: {
      name: propertyName,
      generate: (value) => ({
        value: value.toString(),
      }),
    },
  });

  expect(result).toContain(`${propertyName}:${nonStandardValue}`);
});

it("Generate non standard values with options", () => {
  const nonStandardValue = { name: "Test", age: 25 };
  const keyName = "handledProp";
  const propertyName = "X-HANDLED-PROP-123";

  const nonStandard = {
    [keyName]: nonStandardValue,
  } as const;

  const result = generateNonStandardValues(nonStandard, {
    [keyName]: {
      name: propertyName,
      generate: (value) => ({
        value: value.name,
        options: {
          age: value.age.toString(),
        },
      }),
    },
  });

  expect(result).toContain(
    `${propertyName};age=${nonStandardValue.age}:${nonStandardValue.name}`
  );
});
