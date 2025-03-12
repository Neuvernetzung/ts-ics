import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Line } from "./line";

export type LinesToObject<TType, TOptions = undefined> = (
  schema: StandardSchemaV1<TType> | undefined,
  lines: string,
  options?: TOptions
) => TType;

export type ParseLinesType<TType, TOptions = undefined> = (
  lines: string,
  options?: TOptions
) => TType;

export type LineToObject<TType, TOptions = undefined> = (
  schema: StandardSchemaV1<TType> | undefined,
  line: Line,
  options?: TOptions
) => TType;

export type ParseLineType<TType, TOptions = undefined> = (
  line: Line,
  options?: TOptions
) => TType;
