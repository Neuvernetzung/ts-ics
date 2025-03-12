import type { ConvertLineType, ParseLineType } from "./parse";

export const classTypes = ["PRIVATE", "PUBLIC", "CONFIDENTIAL"] as const;

export type IcsClassTypes = typeof classTypes;
export type IcsClassType = IcsClassTypes[number];

export type ConvertClass = ConvertLineType<IcsClassType>;

export type ParseClassType = ParseLineType<IcsClassType>;
