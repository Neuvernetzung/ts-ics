import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src", "<rootDir>/tests"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
