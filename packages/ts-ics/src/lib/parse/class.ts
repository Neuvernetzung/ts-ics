import { classTypes, type ClassType } from "@/types";

export const icsClassStringToClass = (classString: string | undefined) => {
  if (!classString) return;

  if (classTypes.includes(classString as ClassType))
    return classString as ClassType;

  return;
};
