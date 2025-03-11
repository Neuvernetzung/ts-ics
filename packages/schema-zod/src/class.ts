import { classTypes, icsClassStringToClass, ParseIcsClass } from "ts-ics";
import { z } from "zod";

export const zClassType = z.enum(classTypes);

export const parseIcsClass: ParseIcsClass = (classString) =>
  zClassType.parse(icsClassStringToClass(classString));
