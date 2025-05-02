import { getAlarmRegex, replaceFreeBusyRegex } from "@/constants";
import {
  VFREEBUSY_TO_OBJECT_KEYS,
  type IcsFreeBusyKey,
} from "@/constants/keys/freebusy";
import type {
  IcsFreeBusy,
  ConvertFreeBusy,
  Line,
  IcsFreeBusyTime,
} from "@/types";
import type { IcsAttendee } from "@/types/attendee";

import {
  freeBusyObjectKeyIsTextString,
  freeBusyObjectKeyIsTimeStamp,
} from "../../constants/keyTypes/freebusy";
import { convertIcsAttendee } from "./attendee";
import { convertIcsOrganizer } from "./organizer";
import { convertIcsTimeStamp } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { unescapeTextString } from "./utils/unescapeText";
import { standardValidate } from "./utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";
import { convertIcsFreeBusyTime } from "./freebusyValue";

export const convertIcsFreeBusy = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertFreeBusy<T>>
): ReturnType<ConvertFreeBusy<T>> => {
  const [schema, rawFreeBusyString, options] = args;

  const freeBusyString = rawFreeBusyString.replace(replaceFreeBusyRegex, "");

  const lineStrings = splitLines(freeBusyString.replace(getAlarmRegex, ""));

  const freeBusy: Partial<IcsFreeBusy> = {};

  const attendees: IcsAttendee[] = [];
  const freeBusyTimes: IcsFreeBusyTime[] = [];

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsFreeBusyKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VFREEBUSY_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (freeBusyObjectKeyIsTimeStamp(objectKey)) {
      freeBusy[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (freeBusyObjectKeyIsTextString(objectKey)) {
      freeBusy[objectKey] = unescapeTextString(line.value);
      return;
    }

    if (objectKey === "organizer") {
      freeBusy[objectKey] = convertIcsOrganizer(undefined, line);
      return;
    }

    if (objectKey === "attendees") {
      attendees.push(convertIcsAttendee(undefined, line));
      return;
    }

    if (objectKey === "freeBusy") {
      freeBusyTimes.push(convertIcsFreeBusyTime(undefined, line));
      return;
    }

    freeBusy[objectKey] = line.value; // Set string value
  });

  if (attendees.length > 0) {
    freeBusy.attendees = attendees;
  }

  if (freeBusyTimes.length > 0) {
    freeBusy.freeBusy = freeBusyTimes;
  }

  const validatedFreeBusy = standardValidate(
    schema,
    freeBusy as IcsFreeBusy<T>
  );

  if (!options?.nonStandard) return validatedFreeBusy;

  return convertNonStandardValues(
    validatedFreeBusy,
    nonStandardValues,
    options?.nonStandard
  );
};
