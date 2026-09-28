import { CRLF_BREAK, CRLF_BREAK_REGEX, MAX_LINE_LENGTH } from "@/constants";

const MAX_ONE_BYTE_CODE_UNIT = 0x7f;
const MAX_TWO_BYTE_CODE_UNIT = 0x7ff;
// A raw line feed is escaped later on, so it reserves two bytes.
const LINE_FEED_LENGTH = 2;
// A surrogate pair (a code point outside the BMP) is four bytes in UTF-8.
const SURROGATE_PAIR_LENGTH = 4;

const getCharacterLength = (char: string): number => {
  if (char === "\n") return LINE_FEED_LENGTH;
  if (char.length === 2) return SURROGATE_PAIR_LENGTH;
  const codeUnit = char.charCodeAt(0);
  if (codeUnit <= MAX_ONE_BYTE_CODE_UNIT) return 1;
  if (codeUnit <= MAX_TWO_BYTE_CODE_UNIT) return 2;
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
