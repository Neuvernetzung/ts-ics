import { LineToObject, ParseLineType } from "./parse";

export type Duration = {
  before?: boolean;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type DurationLineToObject = LineToObject<Duration>;

export type ParseDuration = ParseLineType<Duration>;
