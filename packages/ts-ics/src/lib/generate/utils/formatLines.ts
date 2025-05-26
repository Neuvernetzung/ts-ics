import { CRLF_BREAK, CRLF_BREAK_REGEX, MAX_LINE_LENGTH } from "@/constants";

// Hilfsfunktion zur Berechnung der tatsächlichen Länge unter Berücksichtigung von \n
const getActualLength = (str: string): number => {
  // Zähle jedes \n als zwei Zeichen
  const newlineCount = (str.match(/\n/g) || []).length;
  return str.length + newlineCount;
};

export const formatLines = (lines: string) => {
  const newLines = lines.split(CRLF_BREAK_REGEX);
  const formattedLines: string[] = [];

  newLines.forEach((line) => {
    if (getActualLength(line) < MAX_LINE_LENGTH) {
      formattedLines.push(line);
      return;
    }
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

  // Zeichen für Zeichen durchgehen
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const isNewline = char === "\n";
    const charLength = isNewline ? 2 : 1; // \n zählt als 2 Zeichen

    // Prüfen ob das nächste Zeichen noch in die Zeile passt
    if (currentLength + charLength > maxLength) {
      lines.push(lines.length === 0 ? currentLine : ` ${currentLine}`);
      currentLine = char;
      currentLength = charLength;
    } else {
      currentLine += char;
      currentLength += charLength;
    }
  }

  // Letzte Zeile hinzufügen
  if (currentLine) {
    lines.push(lines.length === 0 ? currentLine : ` ${currentLine}`);
  }

  return lines;
};
