import type { ConvertLineType, ParseLineType } from "./parse";

export type Duration = {
  before?: boolean;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type ConvertDuration = ConvertLineType<Duration>;

export type ParseDuration = ParseLineType<Duration>;
