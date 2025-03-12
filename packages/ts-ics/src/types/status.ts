import type { ConvertLineType, ParseLineType } from "./parse";

export const statusTypes = ["TENTATIVE", "CONFIRMED", "CANCELLED"] as const;

export type StatusTypes = typeof statusTypes;
export type StatusType = StatusTypes[number];

export type ConvertStatus = ConvertLineType<StatusType>;

export type ParseStatus = ParseLineType<StatusType>;
