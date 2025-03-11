import {
  icsTimeTransparentStringToTimeTransparent,
  Line,
  ParseTimeTransparentType,
  timeTransparentTypes,
} from "ts-ics";
import { z } from "zod";

export const zTimeTransparentType = z.enum(timeTransparentTypes);

export const parseIcsTimeTransparent: ParseTimeTransparentType = (line) =>
  icsTimeTransparentStringToTimeTransparent(line, zTimeTransparentType);
