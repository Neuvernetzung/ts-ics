import { BREAK_LINE } from "../../../constants";

export const splitLines = (str: string) => {
  const lines: string[] = [];

  const rawLines = str.split(BREAK_LINE).filter((l) => l !== "");

  for (let i = 0; i < rawLines.length; ) {
    let line = rawLines[i];
    i += 1;

    while (rawLines[i] && /^[ \t]/.test(rawLines[i])) {
      line += rawLines[i].trimStart();
      i += 1;
    }

    lines.push(line);
  }

  return lines;
};
