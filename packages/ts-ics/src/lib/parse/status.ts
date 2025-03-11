import { statusTypes, type StatusType } from "@/types";

export type ParseIcsStatus = (StatusString: string) => StatusType | undefined;

export const icsStatusStringToStatus: ParseIcsStatus = (statusString) => {
  if (!statusString) return;

  if (statusTypes.includes(statusString as StatusType))
    return statusString as StatusType;

  return;
};
