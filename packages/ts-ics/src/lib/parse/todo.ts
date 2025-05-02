import { COMMA, getAlarmRegex, replaceTodoRegex } from "@/constants";
import { VTODO_TO_OBJECT_KEYS, type IcsTodoKey } from "@/constants/keys/todo";
import type { IcsTodo, IcsDateObject, ConvertTodo, Line } from "@/types";
import type { IcsAttendee } from "@/types/attendee";

import {
  todoObjectKeyIsArrayOfStrings,
  todoObjectKeyIsTextString,
  todoObjectKeyIsTimeStamp,
} from "../../constants/keyTypes/todo";
import { convertIcsAttendee } from "./attendee";
import { convertIcsDuration } from "./duration";
import { convertIcsOrganizer } from "./organizer";
import { convertIcsRecurrenceRule } from "./recurrenceRule";
import { convertIcsTimeStamp } from "./timeStamp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { convertIcsExceptionDates } from "./exceptionDate";
import { unescapeTextString } from "./utils/unescapeText";
import { convertIcsRecurrenceId } from "./recurrenceId";
import { convertIcsClass } from "./class";
import { convertIcsTodoStatus } from "./status";
import { standardValidate } from "./utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsTodo = <T extends NonStandardValuesGeneric>(
  ...args: Parameters<ConvertTodo<T>>
): ReturnType<ConvertTodo<T>> => {
  const [schema, rawTodoString, options] = args;

  const todoString = rawTodoString.replace(replaceTodoRegex, "");

  const lineStrings = splitLines(todoString.replace(getAlarmRegex, ""));

  const todo: Partial<IcsTodo> = {};

  const attendees: IcsAttendee[] = [];
  const exceptionDates: IcsDateObject[] = [];

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<IcsTodoKey>(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = VTODO_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (todoObjectKeyIsTimeStamp(objectKey)) {
      todo[objectKey] = convertIcsTimeStamp(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (todoObjectKeyIsArrayOfStrings(objectKey)) {
      todo[objectKey] = line.value.split(COMMA);

      return;
    }

    if (todoObjectKeyIsTextString(objectKey)) {
      todo[objectKey] = unescapeTextString(line.value);
      return;
    }

    if (objectKey === "recurrenceRule") {
      todo[objectKey] = convertIcsRecurrenceRule(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "duration") {
      todo[objectKey] = convertIcsDuration(undefined, line);
      return;
    }

    if (objectKey === "organizer") {
      todo[objectKey] = convertIcsOrganizer(undefined, line);
      return;
    }

    if (objectKey === "sequence" || objectKey === "percentComplete") {
      todo[objectKey] = parseInt(line.value);
      return;
    }

    if (objectKey === "attendees") {
      attendees.push(convertIcsAttendee(undefined, line));
      return;
    }

    if (objectKey === "exceptionDates") {
      exceptionDates.push(
        ...convertIcsExceptionDates(undefined, line, {
          timezones: options?.timezones,
        })
      );
      return;
    }

    if (objectKey === "class") {
      todo[objectKey] = convertIcsClass(undefined, line);
      return;
    }

    if (objectKey === "recurrenceId") {
      todo[objectKey] = convertIcsRecurrenceId(undefined, line, {
        timezones: options?.timezones,
      });
      return;
    }

    if (objectKey === "status") {
      todo[objectKey] = convertIcsTodoStatus(undefined, line);
      return;
    }

    todo[objectKey] = line.value; // Set string value
  });

  if (attendees.length > 0) {
    todo.attendees = attendees;
  }

  if (exceptionDates.length > 0) {
    todo.exceptionDates = exceptionDates;
  }

  const validatedTodo = standardValidate(schema, todo as IcsTodo<T>);

  if (!options?.nonStandard) return validatedTodo;

  return convertNonStandardValues(
    validatedTodo,
    nonStandardValues,
    options?.nonStandard
  );
};
