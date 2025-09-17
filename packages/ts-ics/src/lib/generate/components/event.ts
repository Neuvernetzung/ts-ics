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
import { escapeTextString } from "../utils/escapeText";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { generateIcsRecurrenceId } from "../values/recurrenceId";
import { generateIcsOptions } from "../utils/generateOptions";
import { _generateIcsComponent, GenerateIcsComponentProps } from "./_component";
import { VEVENT_OBJECT_KEY } from "@/constants";

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
        generateIcsLine(
          icsKey,
          escapeTextString(value),
          event.descriptionAltRep
            ? generateIcsOptions([
                { key: "ALTREP", value: `"${event.descriptionAltRep}"` },
              ])
            : undefined
        ),
      location: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      comment: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      summary: ({ icsKey, value }) =>
        generateIcsLine(icsKey, escapeTextString(value)),
      recurrenceRule: ({ value }) => generateIcsRecurrenceRule(value),
      duration: ({ icsKey, value }) =>
        generateIcsLine(icsKey, generateIcsDuration(value)),
      organizer: ({ value }) => generateIcsOrganizer(value),
      sequence: ({ icsKey, value }) =>
        generateIcsLine(icsKey, value.toString()),
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
