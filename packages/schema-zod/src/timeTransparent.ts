import {
  icsTimeTransparentStringToTimeTransparent,
  Line,
  timeTransparentTypes,
} from "ts-ics";
import { z } from "zod";

export const zTimeTransparentType = z.enum(timeTransparentTypes);

export const parseIcsTimeTransparent = (line: Line) =>
  icsTimeTransparentStringToTimeTransparent(line, zTimeTransparentType);
