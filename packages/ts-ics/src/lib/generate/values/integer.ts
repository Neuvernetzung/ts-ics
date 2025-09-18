import { generateIcsLine } from "../utils/addLine";

export const generateIcsInteger = (icsKey: string, value: number) =>
  generateIcsLine(icsKey, Math.trunc(value).toString());
