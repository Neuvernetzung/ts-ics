import { LineToObject, ParseLineType } from "./parse";

export const statusTypes = ["TENTATIVE", "CONFIRMED", "CANCELLED"] as const;

export type StatusTypes = typeof statusTypes;
export type StatusType = StatusTypes[number];

export type StatusTypeLineToObject = LineToObject<StatusType>;

export type ParseStatusType = ParseLineType<StatusType>;
