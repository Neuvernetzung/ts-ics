export const statusTypes = ["TENTATIVE", "CONFIRMED", "CANCELLED"] as const;

export type StatusTypes = typeof statusTypes;
export type StatusType = StatusTypes[number];
