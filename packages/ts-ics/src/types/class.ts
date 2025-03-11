export const classTypes = ["PRIVATE", "PUBLIC", "CONFIDENTIAL"] as const;

export type ClassTypes = typeof classTypes;
export type ClassType = ClassTypes[number];
