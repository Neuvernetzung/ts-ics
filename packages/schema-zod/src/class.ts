import { classTypes, icsClassStringToClass, ParseClassType } from "ts-ics";
import { z } from "zod";

export const zClassType = z.enum(classTypes);

export const parseIcsClassType: ParseClassType = (line) =>
  icsClassStringToClass(line, zClassType);
