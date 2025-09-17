import type { ConvertLineType, ParseLineType } from "../parse";

export const timeTransparentTypes = ["TRANSPARENT", "OPAQUE"] as const;

export type IcsTimeTransparentTypes = typeof timeTransparentTypes;
export type IcsTimeTransparentType = IcsTimeTransparentTypes[number];

export type ConvertTimeTransparent = ConvertLineType<IcsTimeTransparentType>;

export type ParseTimeTransparent = ParseLineType<IcsTimeTransparentType>;
