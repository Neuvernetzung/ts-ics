import { VALARM_OBJECT_KEY } from "@/constants";
import { VALARM_TO_OBJECT_KEYS } from "@/constants/keys/alarm";
import type { ConvertAlarm } from "@/types";

import { convertIcsAttachment } from "../values/attachment";
import { convertIcsAttendee } from "../values/attendee";
import { convertIcsDuration } from "../values/duration";
import { convertIcsTrigger } from "../values/trigger";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { _convertIcsComponent } from "./_component";

export const convertIcsAlarm = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertAlarm<T>>
): ReturnType<ConvertAlarm<T>> => {
  const [schema, rawAlarmString, options] = args;

  return _convertIcsComponent(schema, rawAlarmString, {
    icsComponent: VALARM_OBJECT_KEY,
    objectKeyMap: VALARM_TO_OBJECT_KEYS,
    convertValues: {
      trigger: ({ line }) =>
        convertIcsTrigger(undefined, line, {
          timezones: options?.timezones,
        }),
      duration: ({ line }) => convertIcsDuration(undefined, line),
      repeat: ({ line }) => Number.parseInt(line.value, 10),
    },
    convertArrayValues: {
      attachments: ({ line }) => convertIcsAttachment(undefined, line),
      attendees: ({ line }) => convertIcsAttendee(undefined, line),
    },
    nonStandard: options?.nonStandard,
    timezones: options?.timezones,
  });
};
