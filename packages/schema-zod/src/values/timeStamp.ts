import { convertIcsTimeStamp, type ParseTimeStamp } from "ts-ics";
import { zIcsDateObject } from "./date";

export const parseicsTimeStamp: ParseTimeStamp = (...props) =>
  convertIcsTimeStamp(zIcsDateObject, ...props);
