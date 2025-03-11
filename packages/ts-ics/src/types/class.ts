import { z } from "zod";

export const classTypes = ["PRIVATE", "PUBLIC", "CONFIDENTIAL"] as const;

export type ClassTypes = typeof classTypes;
export type ClassType = ClassTypes[number];

export const zClassType = z.enum(classTypes);
