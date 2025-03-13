import { StandardSchemaV1 } from "@standard-schema/spec";
import { Line } from "./line";

export type NonStandardValueName = `X-${string}`;

export type ParseNonStandardValue<TValue = unknown> = {
  name: NonStandardValueName;
  convert: (line: Line) => TValue;
  schema?: StandardSchemaV1<NoInfer<TValue>>;
};
