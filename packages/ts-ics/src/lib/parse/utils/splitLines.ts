import { BREAK_REGEX, LF_BREAK } from "../../../constants";

const startsWithWhiteSpace = (value: string): boolean => /^[ \t]/.test(value);
const isNewValue = (value: string): boolean =>
  /^[A-Z]+(?:-[A-Z]+)*[:;]/.test(value); // regex checks for uppercase, "-" between and ":" or ";" at the end to know if its a new line value

export const splitLines = (str: string) => {
  const lines: string[] = [];

  const rawLines = str.split(BREAK_REGEX);

  // remove forgotten leading linebreaks
  while (rawLines[0] === "") rawLines.shift();

  let endIndex = rawLines.length;

  // remove forgotten trailing linebreaks #130
  while (endIndex > 0 && rawLines[endIndex - 1] === "") {
    endIndex -= 1;
    rawLines.pop();
  }

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
          line += rawLines[i].substring(1);
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
