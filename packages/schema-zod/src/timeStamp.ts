import { convertIcsTimeStamp, type ParseTimeStamp } from "ts-ics";
import { zDateObject } from "./date";

export const parseicsTimeStamp: ParseTimeStamp = (...props) =>
  convertIcsTimeStamp(zDateObject, ...props);
