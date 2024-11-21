import set from "lodash/set";

import { COMMA, SEMICOLON } from "@/constants";
import {
  RRULE_TO_OBJECT_KEYS,
  type RRuleKey,
  type RRuleObjectKey,
} from "@/constants/keys/recurrenceRule";
import { type RecurrenceRule, type VTimezone, zRecurrenceRule } from "@/types";

import { icsTimeStampToObject } from "./timeStamp";
import { getOptions } from "./utils/options";
import { icsWeekdayNumberToObject } from "./weekdayNumber";

const recurrenceTimestampKeys: RRuleObjectKey[] = ["until"];

export const recurrenceObjectKeyIsTimeStamp = (objectKey: RRuleObjectKey) =>
  recurrenceTimestampKeys.includes(objectKey);

const recurrenceNumberArrayKeys: RRuleObjectKey[] = [
  "bySecond",
  "byMinute",
  "byHour",
  "byMonthday",
  "byYearday",
  "byWeekNo",
  "bySetPos",
];

export const recurrenceObjectKeyIsNumberArray = (objectKey: RRuleObjectKey) =>
  recurrenceNumberArrayKeys.includes(objectKey);

const recurrenceWeekdayNumberArrayKeys: RRuleObjectKey[] = ["byDay"];

export const recurrenceObjectKeyIsWeekdayNumberArray = (
  objectKey: RRuleObjectKey
) => recurrenceWeekdayNumberArrayKeys.includes(objectKey);

const recurrenceNumberKeys: RRuleObjectKey[] = ["count", "interval"];

export const recurrenceObjectKeyIsNumber = (objectKey: RRuleObjectKey) =>
  recurrenceNumberKeys.includes(objectKey);

export type ParseIcsRecurrenceRule = (
  ruleString: string,
  timezones?: VTimezone[]
) => RecurrenceRule;

export const icsRecurrenceRuleToObject: ParseIcsRecurrenceRule = (
  ruleString,
  timezones
) => {
  const rule = {};

  const options = getOptions<RRuleKey>(ruleString.split(SEMICOLON));

  options.forEach((r) => {
    const { property, value } = r;

    const objectKey = RRULE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (recurrenceObjectKeyIsTimeStamp(objectKey)) {
      set(
        rule,
        objectKey,
        icsTimeStampToObject(
          value,
          { VALUE: value.includes("T") ? "DATE-TIME" : "DATE" },
          timezones
        )
      );
      return;
    }

    if (recurrenceObjectKeyIsNumberArray(objectKey)) {
      set(
        rule,
        objectKey,
        value.split(COMMA).map((v) => Number(v))
      );
      return;
    }

    if (objectKey === "byMonth") {
      set(
        rule,
        objectKey,
        value.split(COMMA).map((v) => Number(v) - 1) // ICS byMonth fängt bei 1 an, Javascript bei 0
      );
      return;
    }

    if (recurrenceObjectKeyIsWeekdayNumberArray(objectKey)) {
      set(
        rule,
        objectKey,
        value.split(COMMA).map((v) => icsWeekdayNumberToObject(v))
      );
      return;
    }

    if (recurrenceObjectKeyIsNumber(objectKey)) {
      set(rule, objectKey, Number(value));
      return;
    }

    set(rule, objectKey, value); // Set string value
  });

  return rule as RecurrenceRule;
};

export const parseIcsRecurrenceRule: ParseIcsRecurrenceRule = (
  ruleString,
  timezones
) => zRecurrenceRule.parse(icsRecurrenceRuleToObject(ruleString, timezones));
