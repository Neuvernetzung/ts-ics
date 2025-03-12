import type { ConvertLineType, ParseLineType } from "./parse";

export const statusTypes = ["TENTATIVE", "CONFIRMED", "CANCELLED"] as const;

export type IcsStatusTypes = typeof statusTypes;
export type IcsStatusType = IcsStatusTypes[number];

export type ConvertStatus = ConvertLineType<IcsStatusType>;

export type ParseStatus = ParseLineType<IcsStatusType>;
