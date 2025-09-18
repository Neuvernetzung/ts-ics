import { VEVENT_TO_KEYS } from "@/constants/keys/event";

import type { IcsEvent } from "@/types";

import { generateIcsAlarm } from "./alarm";
import { generateIcsAttendee } from "../values/attendee";
import { generateIcsExceptionDate } from "../values/exceptionDate";
import { generateIcsDuration } from "../values/duration";
import { generateIcsOrganizer } from "../values/organizer";
import { generateIcsRecurrenceRule } from "../values/recurrenceRule";
import { generateIcsTimeStamp } from "../values/timeStamp";
import { generateIcsLine } from "../utils/addLine";
import type { NonStandardValuesGeneric } from "@/types/nonStandard/nonStandardValues";
import { generateIcsRecurrenceId } from "../values/recurrenceId";
import {
  _generateIcsComponent,
  type GenerateIcsComponentProps,
} from "./_component";
import { VEVENT_OBJECT_KEY } from "@/constants";
import { generateIcsInteger } from "../values/integer";
import { generateIcsText } from "../values/text";

export const generateIcsEvent = <T extends NonStandardValuesGeneric>(
  event: IcsEvent,
  options?: Pick<
    GenerateIcsComponentProps<IcsEvent, T>,
    "nonStandard" | "skipFormatLines" | "timezones"
  >
) =>
  _generateIcsComponent(event, {
    icsComponent: VEVENT_OBJECT_KEY,
    icsKeyMap: VEVENT_TO_KEYS,
    omitGenerateKeys: ["descriptionAltRep"],
    generateValues: {
      stamp: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
          forceUtc: true,
        }),
      start: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      end: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      created: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      lastModified: ({ icsKey, value }) =>
        generateIcsTimeStamp(icsKey, value, undefined, {
          timezones: options?.timezones,
        }),
      categories: ({ icsKey, value }) =>
        generateIcsLine(icsKey, value.join(",")),
      description: ({ icsKey, value }) =>
        generateIcsText(
          icsKey,
          value,
          event.descriptionAltRep
            ? [{ key: "ALTREP", value: `"${event.descriptionAltRep}"` }]
            : undefined
        ),
      location: ({ icsKey, value }) => generateIcsText(icsKey, value),
      comment: ({ icsKey, value }) => generateIcsText(icsKey, value),
      summary: ({ icsKey, value }) => generateIcsText(icsKey, value),
      recurrenceRule: ({ value }) => generateIcsRecurrenceRule(value),
      duration: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsDuration(value)),
      organizer: ({ value }) => generateIcsOrganizer(value),
      sequence: ({ icsKey, value }) => generateIcsInteger(icsKey, value),
      recurrenceId: ({ value }) =>
        generateIcsRecurrenceId(value, {
          timezones: options?.timezones,
        }),
    },
    generateArrayValues: {
      attendees: ({ value }) => generateIcsAttendee(value, "ATTENDEE"),
      exceptionDates: ({ value }) =>
        generateIcsExceptionDate(value, "EXDATE", {
          timezones: options?.timezones,
        }),
    },
    childComponents: {
      alarms: (alarm) =>
        generateIcsAlarm(alarm, {
          nonStandard: options?.nonStandard,
          skipFormatLines: true,
        }),
    },
    nonStandard: options?.nonStandard,
    skipFormatLines: options?.skipFormatLines,
    timezones: options?.timezones,
  });
