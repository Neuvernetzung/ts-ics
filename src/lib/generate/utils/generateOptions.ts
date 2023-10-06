import { EQUAL_SIGN, SEMICOLON } from "@/constants";

type GenerateIcsOptionsProps = { key: string; value: string }[];

export const generateIcsOptions = (options: GenerateIcsOptionsProps) => {
  if (options.length < 1) return;

  return `${options
    .map((option) => `${option.key}${EQUAL_SIGN}${option.value}`)
    .join(SEMICOLON)}`;
};
