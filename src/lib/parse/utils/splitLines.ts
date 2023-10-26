import { OBJECT_END, OBJECT_START } from "@/constants/keys";

import { BREAK_LINE } from "../../../constants";

export const splitLines = <TKeys extends ReadonlyArray<string>>(
  keys: TKeys,
  str: string
) => {
  const allKeys = [...keys, OBJECT_END, OBJECT_START];

  const lines: string[] = [];

  const rawLines = str
    .split(BREAK_LINE)
    .map((l) => l.trim())
    .filter((l) => l !== "");

  for (let i = 0; i < rawLines.length;) {
    if (rawLines[i].length < 74) {
      // Notwendig, da eine Zeile in einer ICS Datei maximal 75 Zeichen lang sein darf.
      lines.push(rawLines[i]);
      i += 1;
    } else if (
      rawLines[i + 1] &&
      allKeys.some((k) => rawLines[i + 1].startsWith(k))
    ) {
      lines.push(rawLines[i]);
      i += 1;
    } else {
      let mergedLine = rawLines[i];
      i += 1;

      // eslint-disable-next-line no-loop-func
      while (rawLines[i] && !allKeys.some((k) => rawLines[i].startsWith(k))) {
        mergedLine += rawLines[i];
        i += 1;
      }

      lines.push(mergedLine);
    }
  }

  return lines;
};
