import { classTypes, zClassType, type ClassType } from "@/types";

export type ParseIcsClass = (classString: string) => ClassType | undefined;

export const icsClassStringToClass: ParseIcsClass = (classString) => {
  if (!classString) return;

  if (classTypes.includes(classString as ClassType))
    return classString as ClassType;

  return;
};

export const parseIcsClass: ParseIcsClass = (ClassString) =>
  zClassType.parse(icsClassStringToClass(ClassString));
