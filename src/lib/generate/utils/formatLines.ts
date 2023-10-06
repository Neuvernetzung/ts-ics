import { BREAK, BREAK_LINE } from "@/constants";

export const formatLines = (lines: string) => {
  const newLines = lines.split(BREAK_LINE);

  const formattedLines: string[] = [];

  newLines.forEach((line) => {
    if (line.length < 75) {
      formattedLines.push(line);
      return;
    }
    foldLine(line, 75).forEach((l) => {
      formattedLines.push(l);
    });
  });

  return formattedLines.join(BREAK);
};

function foldLine(line: string, length: number) {
  let l = line;
  const lines = [];

  while (Math.ceil(l.length / length) >= 1) {
    lines.push(l.substring(0, length));
    l = l.substring(length + 1);
  }

  return lines;
}
