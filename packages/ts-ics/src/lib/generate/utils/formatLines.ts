import { CRLF_BREAK, CRLF_BREAK_REGEX, MAX_LINE_LENGTH } from "@/constants";

const getCharacterLength = (char: string): number => {
  // Preserve the escaped width reserved for raw line feeds.
  if (char === "\n") return 2;
  if (char.length === 2) return 4;
  const codeUnit = char.charCodeAt(0);
  if (codeUnit <= 0x7f) return 1;
  if (codeUnit <= 0x7ff) return 2;
  return 3;
};

export const formatLines = (lines: string) => {
  const newLines = lines.split(CRLF_BREAK_REGEX);
  const formattedLines: string[] = [];

  newLines.forEach((line) => {
    foldLine(line, MAX_LINE_LENGTH).forEach((l) => {
      formattedLines.push(l);
    });
  });

  return formattedLines.join(CRLF_BREAK);
};

const foldLine = (line: string, maxLength: number) => {
  const lines = [];
  let currentLine = "";
  let currentLength = 0;

  // RFC 5545 counts UTF-8 octets, including the continuation space.
  for (const char of line) {
    const charLength = getCharacterLength(char);

    if (currentLength + charLength > maxLength) {
      lines.push(currentLine);
      currentLine = " ";
      currentLength = 1;
    }
    currentLine += char;
    currentLength += charLength;
  }

  lines.push(currentLine);

  return lines;
};
