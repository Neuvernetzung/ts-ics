import {
  icsTimeTransparentStringToTimeTransparent,
  ParseIcsTimeTransparent,
  timeTransparentTypes,
} from "ts-ics";
import { z } from "zod";

export const zTimeTransparentType = z.enum(timeTransparentTypes);

export const parseIcsTimeTransparent: ParseIcsTimeTransparent = (
  TimeTransparentString
) =>
  zTimeTransparentType.parse(
    icsTimeTransparentStringToTimeTransparent(TimeTransparentString)
  );
