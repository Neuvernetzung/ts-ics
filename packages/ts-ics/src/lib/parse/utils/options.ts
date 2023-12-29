import set from "lodash/set";

import { EQUAL_SIGN } from "@/constants";

type RawOption = { property: string; value: string };

export const removeDoubleQuotesFromString = (str: string) => {
  if (str.startsWith('"') && str.endsWith('"')) {
    const result = str.slice(1, -1);
    return result;
  }
  return str;
};

export const getOptions = <TKey extends string>(optionsStrings: string[]) =>
  optionsStrings.map((option) => {
    const [property, ...valueArray] = option.split(EQUAL_SIGN);

    const value = valueArray.join(EQUAL_SIGN);

    return {
      property: property as TKey,
      value: removeDoubleQuotesFromString(value),
    };
  }, {});

export const reduceOptions = (options: RawOption[]) =>
  options.reduce((prev, next) => {
    set(prev, next.property, next.value);
    return prev;
  }, {});

export const splitOptions = (optionsStrings: string[]) =>
  reduceOptions(getOptions(optionsStrings));
