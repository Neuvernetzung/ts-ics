import type { LineToObject, ParseLineType } from "./parse";

export const classTypes = ["PRIVATE", "PUBLIC", "CONFIDENTIAL"] as const;

export type ClassTypes = typeof classTypes;
export type ClassType = ClassTypes[number];

export type ClassTypeLineToObject = LineToObject<ClassType>;

export type ParseClassType = ParseLineType<ClassType>;
