import { BREAK_REGEX, LF_BREAK } from "../../../constants";

const startsWithWhiteSpace = (value: string): boolean => /^[ \t]/.test(value);
const isNewValue = (value: string): boolean =>
  /^[A-Z]+(?:-[A-Z]+)*[:;]/.test(value); // regex checks for uppercase, "-" between and ":" or ";" at the end to know if its a new line value

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
      (startsWithWhiteSpace(rawLines[i]) || !isNewValue(rawLines[i]))
    ) {
      if (rawLines[i] === "") {
        // handle multiple breaks
        line += LF_BREAK;
      } else {
        if (startsWithWhiteSpace(rawLines[i])) {
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
