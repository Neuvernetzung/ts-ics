import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Line } from "./line";

export type NonStandardValueName = `X-${string}`;

export type NonStandardValuesGeneric = Record<string, any>;

export type ParseNonStandardValue<TValue = unknown> = {
  name: NonStandardValueName;
  convert: (line: Line) => TValue;
  schema?: StandardSchemaV1<TValue>;
};

export type ParseNonStandardValues<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  [K in keyof TNonStandardValues]: ParseNonStandardValue<TNonStandardValues[K]>;
};

export type GenerateNonStandardValue<TValue = unknown> = {
  name: NonStandardValueName;
  generate: (value: TValue) => Line | undefined | null;
};

export type GenerateNonStandardValues<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  [K in keyof TNonStandardValues]: GenerateNonStandardValue<
    TNonStandardValues[K]
  >;
};
