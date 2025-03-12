import type { LineToObject, ParseLineType } from "./parse";

export const timeTransparentTypes = ["TRANSPARENT", "OPAQUE"] as const;

export type TimeTransparentTypes = typeof timeTransparentTypes;
export type TimeTransparentType = TimeTransparentTypes[number];

export type TimeTransparentTypeLineToObject = LineToObject<TimeTransparentType>;

export type ParseTimeTransparentType = ParseLineType<TimeTransparentType>;
