import type { StandardSchemaV1 } from "@standard-schema/spec";
import { Line } from "./line";

export type LinesToObject<TType, TArgs extends unknown[] = []> = (
  lines: string,
  schema: StandardSchemaV1<TType> | undefined,
  ...options: TArgs
) => TType;

export type ParseLinesType<TType, TArgs extends unknown[] = []> = (
  lines: string,
  ...options: TArgs
) => TType;

export type LineToObject<TType, TArgs extends unknown[] = []> = (
  line: Line,
  schema: StandardSchemaV1<TType> | undefined,
  ...options: TArgs
) => TType;

export type ParseLineType<TType, TArgs extends unknown[] = []> = (
  line: Line,
  ...options: TArgs
) => TType;
