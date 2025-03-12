import { classTypes, icsClassStringToClass, type ParseClassType } from "ts-ics";
import { z } from "zod";

export const zClassType = z.enum(classTypes);

export const parseIcsClassType: ParseClassType = (...props) =>
  icsClassStringToClass(zClassType, ...props);
