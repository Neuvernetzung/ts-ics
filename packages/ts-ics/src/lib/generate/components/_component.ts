import { IcsComponent } from "@/constants";
import {
  GenerateNonStandardValues,
  IcsTimezone,
  NonStandardValuesGeneric,
} from "@/types";
import { getKeys } from "../utils/getKeys";
import {
  generateIcsLine,
  getIcsEndLine,
  getIcsStartLine,
} from "../utils/addLine";
import { generateNonStandardValues } from "../nonStandard";
import { formatLines } from "../utils/formatLines";

type PickArrays<T> = {
  [K in keyof T as Exclude<T[K], undefined> extends any[] ? K : never]: T[K];
};

type ArrayElement<T> = T extends (infer U)[] ? U : never;

export type GenerateIcsComponentProps<
  TData extends object & { nonStandard?: object },
  TNonStandard extends NonStandardValuesGeneric,
  TArrayData extends PickArrays<TData> = PickArrays<TData>,
  TChildComponentData extends PickArrays<TData> = PickArrays<TData>
> = {
  icsComponent: IcsComponent;
  icsKeyMap: Partial<Omit<Record<keyof TData, string>, "nonStandard">>;
  skipFormatLines?: boolean;
  nonStandard?: GenerateNonStandardValues<TNonStandard>;
  timezones?: IcsTimezone[];
  generateValues: {
    [K in keyof TData]?: (props: {
      icsKey: string;
      value: NonNullable<TData[K]>;
      key: K;
    }) => string | undefined;
  };
  generateArrayValues?: {
    [K in keyof TArrayData]?: (props: {
      icsKey: string;
      value: ArrayElement<TArrayData[K]>;
    }) => string | undefined;
  };
  childComponents?: {
    [K in keyof TChildComponentData]: (
      childData: ArrayElement<TChildComponentData[K]> & { nonStandard?: object }
    ) => string;
  };

  omitGenerateKeys?: (keyof TData)[];
};

export const _generateIcsComponent = <
  TData extends object & { nonStandard?: object },
  TNonStandard extends NonStandardValuesGeneric,
  TArrayData extends PickArrays<TData> = PickArrays<TData>,
  TChildComponentData extends PickArrays<TData> = PickArrays<TData>
>(
  data: TData,
  options: GenerateIcsComponentProps<
    TData,
    TNonStandard,
    TArrayData,
    TChildComponentData
  >
) => {
  const dataKeys = getKeys(data);

  const childComponents = options.childComponents;
  const childComponentKeys = childComponents ? getKeys(childComponents) : [];

  const generateArrayValues = options.generateArrayValues;
  const arrayValueKeys = generateArrayValues
    ? getKeys(generateArrayValues)
    : [];

  let icsString = "";

  icsString += getIcsStartLine(options.icsComponent);

  dataKeys.forEach((key) => {
    if (
      childComponentKeys.includes(key as keyof TChildComponentData) ||
      arrayValueKeys.includes(key as keyof TArrayData)
    )
      return;

    if (key === "nonStandard") {
      return;
    }

    const icsKey = options.icsKeyMap[key as keyof Omit<TData, "nonStandard">];

    if (!icsKey) return;

    const value = data[key];

    if (value === undefined || value === null) return;

    const generateValueFunction = options.generateValues[key];

    if (generateValueFunction) {
      icsString += generateValueFunction({ icsKey, value, key });
      return;
    }

    icsString += generateIcsLine(icsKey, String(value));
  });

  if (childComponents && childComponentKeys && childComponentKeys.length > 0) {
    childComponentKeys.forEach((childComponentKey) => {
      const childrenData = data[childComponentKey as keyof TData];

      if (
        !childrenData ||
        !Array.isArray(childrenData) ||
        childrenData.length === 0
      )
        return;

      childrenData.forEach((childData) => {
        const childComponentGenerateFunction =
          childComponents[childComponentKey];

        if (!childComponentGenerateFunction) return;

        icsString += childComponentGenerateFunction(childData);
      });
    });
  }

  if (generateArrayValues && arrayValueKeys && arrayValueKeys.length > 0) {
    arrayValueKeys.forEach((arrayValueKey) => {
      const generateArrayValue = generateArrayValues[arrayValueKey];

      if (!generateArrayValue) return;

      const icsKey =
        options.icsKeyMap[
          arrayValueKey as unknown as keyof Omit<TData, "nonStandard">
        ];

      if (!icsKey) return;

      const arrayData = data[arrayValueKey as keyof TData];

      if (!arrayData || !Array.isArray(arrayData) || arrayData.length === 0)
        return;

      arrayData.forEach((value) => {
        icsString += generateArrayValue({ icsKey, value });
      });
    });
  }

  if (data.nonStandard) {
    icsString += generateNonStandardValues(
      data.nonStandard,
      options?.nonStandard
    );
  }

  icsString += getIcsEndLine(options.icsComponent);

  if (options?.skipFormatLines) return icsString;

  return formatLines(icsString);

  return icsString;
};
