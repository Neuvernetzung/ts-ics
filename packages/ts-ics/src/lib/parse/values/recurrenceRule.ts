import { COMMA, SEMICOLON } from "@/constants";
import {
  RRULE_TO_OBJECT_KEYS,
  type IcsRecurrenceRuleKey,
  type IcsRecurrenceRuleObjectKey,
} from "@/constants/keys/recurrenceRule";
import {
  type IcsRecurrenceRule,
  recurrenceRuleFrequencies,
  type IcsRecurrenceRuleFrequency,
  type ConvertRecurrenceRule,
} from "@/types";

import { convertIcsTimeStamp } from "../values/timeStamp";
import { getOptions } from "../utils/options";
import { convertIcsWeekDayNumber } from "../values/weekDayNumber";
import { convertIcsWeekDay } from "../values/weekDay";
import { standardValidate } from "../utils/standardValidate";

const recurrenceTimestampKeys = [
  "until",
] satisfies IcsRecurrenceRuleObjectKey[];

type RecurrenceTimeStampKey = (typeof recurrenceTimestampKeys)[number];

export const recurrenceObjectKeyIsTimeStamp = (
  objectKey: IcsRecurrenceRuleObjectKey
): objectKey is RecurrenceTimeStampKey =>
  recurrenceTimestampKeys.includes(objectKey as RecurrenceTimeStampKey);

const recurrenceNumberArrayKeys = [
  "bySecond",
  "byMinute",
  "byHour",
  "byMonthday",
  "byYearday",
  "byWeekNo",
  "bySetPos",
] satisfies IcsRecurrenceRuleObjectKey[];

type RecurrenceNumberArrayKey = (typeof recurrenceNumberArrayKeys)[number];

export const recurrenceObjectKeyIsNumberArray = (
  objectKey: IcsRecurrenceRuleObjectKey
): objectKey is RecurrenceNumberArrayKey =>
  recurrenceNumberArrayKeys.includes(objectKey as RecurrenceNumberArrayKey);

const recurrenceWeekdayNumberArrayKeys = [
  "byDay",
] satisfies IcsRecurrenceRuleObjectKey[];

type RecurrenceWeekDayNumberArrayKey =
  (typeof recurrenceWeekdayNumberArrayKeys)[number];

export const recurrenceObjectKeyIsWeekdayNumberArray = (
  objectKey: IcsRecurrenceRuleObjectKey
): objectKey is RecurrenceWeekDayNumberArrayKey =>
  recurrenceWeekdayNumberArrayKeys.includes(
    objectKey as RecurrenceWeekDayNumberArrayKey
  );

const recurrenceNumberKeys = [
  "count",
  "interval",
] satisfies IcsRecurrenceRuleObjectKey[];

type RecurrenceNumberKey = (typeof recurrenceNumberKeys)[number];

export const recurrenceObjectKeyIsNumber = (
  objectKey: IcsRecurrenceRuleObjectKey
): objectKey is RecurrenceNumberKey =>
  recurrenceNumberKeys.includes(objectKey as RecurrenceNumberKey);

export const convertIcsRecurrenceRule: ConvertRecurrenceRule = (
  schema,
  line,
  recurrenceRuleOptions
) => {
  const rule: Partial<IcsRecurrenceRule> = {};

  const options = getOptions<IcsRecurrenceRuleKey>(line.value.split(SEMICOLON));

  options.forEach((r) => {
    const { property, value } = r;

    const objectKey = RRULE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (recurrenceObjectKeyIsTimeStamp(objectKey)) {
      rule[objectKey] = convertIcsTimeStamp(
        undefined,
        {
          value,
          options: { VALUE: value.includes("T") ? "DATE-TIME" : "DATE" },
        },
        { timezones: recurrenceRuleOptions?.timezones }
      );

      return;
    }

    if (recurrenceObjectKeyIsNumberArray(objectKey)) {
      rule[objectKey] = value.split(COMMA).map((v) => Number(v));

      return;
    }

    if (objectKey === "byMonth") {
      rule[objectKey] = value.split(COMMA).map((v) => Number(v) - 1); // ICS byMonth fängt bei 1 an, Javascript bei 0
      return;
    }

    if (recurrenceObjectKeyIsWeekdayNumberArray(objectKey)) {
      rule[objectKey] = value
        .split(COMMA)
        .map((v) => convertIcsWeekDayNumber(undefined, { value: v }));
      return;
    }

    if (recurrenceObjectKeyIsNumber(objectKey)) {
      rule[objectKey] = Number(value);
      return;
    }

    if (objectKey === "frequency") {
      if (
        !value ||
        !recurrenceRuleFrequencies.includes(value as IcsRecurrenceRuleFrequency)
      )
        return;

      rule[objectKey] = value as IcsRecurrenceRuleFrequency;
      return;
    }

    if (objectKey === "workweekStart") {
      rule[objectKey] = convertIcsWeekDay(undefined, { value });
      return;
    }
  });

  return standardValidate(schema, rule as IcsRecurrenceRule);
};
