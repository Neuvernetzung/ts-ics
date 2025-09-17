import { classTypes, convertIcsClass, type ParseClassType } from "ts-ics";
import { z } from "zod";

export const zIcsClassType = z.enum(classTypes);

export const parseIcsClassType: ParseClassType = (...props) =>
  convertIcsClass(zIcsClassType, ...props);
