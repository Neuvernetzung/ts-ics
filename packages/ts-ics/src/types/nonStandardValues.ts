import { Line } from "./line";

export type ParseNonStandardValue<TValue = unknown> = {
  name: `X-${string}`;
  convert: (line: Line) => TValue;
  parse?: (value: TValue) => TValue;
};
