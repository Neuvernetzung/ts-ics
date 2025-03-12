import type { ConvertLineType, ParseLineType } from "./parse";

export const classTypes = ["PRIVATE", "PUBLIC", "CONFIDENTIAL"] as const;

export type ClassTypes = typeof classTypes;
export type ClassType = ClassTypes[number];

export type ConvertClass = ConvertLineType<ClassType>;

export type ParseClassType = ParseLineType<ClassType>;
