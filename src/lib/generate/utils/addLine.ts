import { BREAK } from "@/constants";
import type { IcsComponent } from "@/constants/keys";

export const formatIcsLine = (line: string) => `${line}${BREAK}`;

export const generateIcsLine = (
  key: string,
  value: string | number | undefined | null,
  options?: string,
) => {
  if (!options) return formatIcsLine(`${key}:${value}`);

  if (value === undefined || value === null) return "";

  return formatIcsLine(`${key};${options}:${value}`);
};

export const getIcsStartLine = (component: IcsComponent) =>
  formatIcsLine(`BEGIN:${component}`);

export const getIcsEndLine = (component: IcsComponent) =>
  formatIcsLine(`END:${component}`);
