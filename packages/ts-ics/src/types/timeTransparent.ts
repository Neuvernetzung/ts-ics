import type { ConvertLineType, ParseLineType } from "./parse";

export const timeTransparentTypes = ["TRANSPARENT", "OPAQUE"] as const;

export type TimeTransparentTypes = typeof timeTransparentTypes;
export type TimeTransparentType = TimeTransparentTypes[number];

export type ConvertTimeTransparent = ConvertLineType<TimeTransparentType>;

export type ParseTimeTransparent = ParseLineType<TimeTransparentType>;
