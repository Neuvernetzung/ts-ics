import { statusTypes, type StatusType } from "@/types";

export type ParseIcsStatus = (StatusString: string) => StatusType | undefined;

export const icsStatusStringToStatus: ParseIcsStatus = (StatusString) => {
  if (!StatusString) return;

  if (statusTypes.includes(StatusString as StatusType))
    return StatusString as StatusType;

  return;
};
