import { CRLF_BREAK, CRLF_BREAK_REGEX, MAX_LINE_LENGTH } from "@/constants";

export const formatLines = (lines: string) => {
  const newLines = lines.split(CRLF_BREAK_REGEX);

  const formattedLines: string[] = [];

  newLines.forEach((line) => {
    const escapedLine = line.replace(/\n/g, "\\n"); // "\n" needs to be escaped because javascript counts "\n".length as 1, but i needs to be 2

    if (escapedLine.length < MAX_LINE_LENGTH) {
      formattedLines.push(escapedLine);
      return;
    }
    foldLine(escapedLine, MAX_LINE_LENGTH).forEach((l) => {
      formattedLines.push(l);
    });
  });

  return formattedLines.join(CRLF_BREAK).replace(/\\n/g, "\n"); // Add back the original "\n", so it can be correctly displayed inside the ics string
};

const foldLine = (line: string, length: number) => {
  let l = line;
  const lines = [];

  while (Math.ceil(l.length / length) >= 1) {
    lines.push(
      lines.length === 0 ? l.substring(0, length) : ` ${l.substring(0, length)}`
    );
    l = l.substring(length);
  }

  return lines;
};
