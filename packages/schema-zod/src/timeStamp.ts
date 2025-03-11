import {
  DateObject,
  icsTimeStampToObject,
  Line,
  ParseTimeStampOptions,
} from "ts-ics";
import { zDateObject } from "./date";

export const parseicsTimeStamp = (
  line: Line,
  options: ParseTimeStampOptions
): DateObject => icsTimeStampToObject(line, zDateObject, options);
