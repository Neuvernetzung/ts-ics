import type { ConvertLineType, ParseLineType } from "../parse";

export type IcsDuration = {
  before?: boolean;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type ConvertDuration = ConvertLineType<IcsDuration>;

export type ParseDuration = ParseLineType<IcsDuration>;
