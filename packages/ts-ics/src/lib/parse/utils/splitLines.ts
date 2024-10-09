import { BREAK_REGEX, LF_BREAK } from "../../../constants";

export const splitLines = (str: string) => {
  const lines: string[] = [];

  const rawLines = str.split(BREAK_REGEX);

  // remove forgotten linebreaks infront and after
  if (rawLines[0] === "") rawLines.shift();
  if (rawLines[rawLines.length - 1] === "") rawLines.pop();

  for (let i = 0; i < rawLines.length; ) {
    let line = rawLines[i];
    i += 1;

    while (
      rawLines[i] !== undefined &&
      (/^[ \t]/.test(rawLines[i]) || !/^[A-Z]+[:;]/.test(rawLines[i]))
    ) {
      if (rawLines[i] === "") {
        // handle multiple breaks
        line += LF_BREAK;
      } else {
        if (/^[ \t]/.test(rawLines[i])) {
          line += rawLines[i].trimStart();
        } else {
          line += LF_BREAK;
          line += rawLines[i];
        }
      }
      i += 1;
    }

    lines.push(line);
  }

  return lines.filter((l) => l !== "");
};
