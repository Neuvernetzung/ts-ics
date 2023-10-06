import set from "lodash/set";

import { COMMA, SEMICOLON } from "@/constants";
import {
  RRULE_TO_OBJECT_KEYS,
  type RRuleKey,
  type RRuleObjectKey,
} from "@/constants/keys/recurrenceRule";
import { VEventRecurrenceRule, zVEventRecurrenceRule } from "@/types";

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
  "byMonth",
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

export const icsRecurrenceRuleToObject = (
  ruleString: string
): VEventRecurrenceRule => {
  const rule = {};

  const options = getOptions<RRuleKey>(ruleString.split(SEMICOLON));

  options.forEach((r) => {
    const { property, value } = r;

    const objectKey = RRULE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (recurrenceObjectKeyIsTimeStamp(objectKey)) {
      set(rule, objectKey, icsTimeStampToObject(value));
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

  return rule as VEventRecurrenceRule;
};

export const parseIcsRecurrenceRule = (ruleString: string) =>
  zVEventRecurrenceRule.parse(icsRecurrenceRuleToObject(ruleString));
