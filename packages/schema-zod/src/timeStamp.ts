import { icsTimeStampToObject, type ParseTimeStamp } from "ts-ics";
import { zDateObject } from "./date";

export const parseicsTimeStamp: ParseTimeStamp = (...props) =>
  icsTimeStampToObject(zDateObject, ...props);
