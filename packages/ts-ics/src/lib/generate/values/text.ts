import { generateIcsLine } from "../utils/addLine";
import { escapeTextString } from "../utils/escapeText";
import {
  generateIcsOptions,
  type GenerateIcsOptionsProps,
} from "../utils/generateOptions";

export const generateIcsText = (
  icsKey: string,
  value: string,
  options?: GenerateIcsOptionsProps
) =>
  generateIcsLine(
    icsKey,
    escapeTextString(value),
    options ? generateIcsOptions(options) : undefined
  );
