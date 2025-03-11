import { icsTimeStampToObject, ParseTimeStamp } from "ts-ics";
import { zDateObject } from "./date";

export const parseicsTimeStamp: ParseTimeStamp = (line, options) =>
  icsTimeStampToObject(line, zDateObject, options);
