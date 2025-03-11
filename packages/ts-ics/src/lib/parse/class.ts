import { classTypes, type ClassType } from "@/types";

export type ParseIcsClass = (classString: string) => ClassType | undefined;

export const icsClassStringToClass: ParseIcsClass = (classString) => {
  if (!classString) return;

  if (classTypes.includes(classString as ClassType))
    return classString as ClassType;

  return;
};
