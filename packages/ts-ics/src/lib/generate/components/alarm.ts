import { VALARM_TO_KEYS } from "@/constants/keys/alarm";
import type { IcsAlarm } from "@/types";

import { generateIcsAttachment } from "../values/attachment";
import { generateIcsAttendee } from "../values/attendee";
import { generateIcsDuration } from "../values/duration";
import { generateIcsTrigger } from "../values/trigger";
import { generateIcsLine } from "../utils/addLine";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { _generateIcsComponent, type GenerateIcsComponentProps } from "./_component";
import { VALARM_OBJECT_KEY } from "@/constants";

export const generateIcsAlarm = <T extends NonStandardValuesGeneric>(
  alarm: IcsAlarm,
  options?: Pick<
    GenerateIcsComponentProps<IcsAlarm, T>,
    "nonStandard" | "skipFormatLines"
  >
) =>
  _generateIcsComponent(alarm, {
    icsComponent: VALARM_OBJECT_KEY,
    icsKeyMap: VALARM_TO_KEYS,
    generateValues: {
      trigger: ({ value }) => generateIcsTrigger(value),
      duration: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsDuration(value)),
      repeat: ({ icsKey, value }) => generateIcsLine(icsKey, value?.toString()),
    },
    generateArrayValues: {
      attendees: ({ value }) => generateIcsAttendee(value, "ATTENDEE"),
      attachments: ({ value }) => generateIcsAttachment(value),
    },
    nonStandard: options?.nonStandard,
    skipFormatLines: options?.skipFormatLines,
  });
