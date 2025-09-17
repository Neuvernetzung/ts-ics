import {
  createGetRegex,
  createReplaceRegex,
  type IcsComponent,
} from "@/constants";
import type { IcsTimezone, Line } from "@/types";

import { getLine } from "../utils/line";
import { splitLines } from "../utils/splitLines";
import { standardValidate } from "../utils/standardValidate";
import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "@/types/nonStandard/nonStandardValues";
import { convertNonStandardValues } from "../nonStandard/nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";
import type { StandardSchemaV1 } from "@standard-schema/spec";

type ArrayElement<T> = T extends (infer U)[] ? U : never;

type ConvertIcsComponentProps<
  TData extends object & { nonStandard?: object },
  TNonStandard extends NonStandardValuesGeneric,
  TNestedIcsComponent extends IcsComponent
> = {
  icsComponent: IcsComponent;
  objectKeyMap: Partial<Omit<Record<string, keyof TData>, "nonStandard">>;
  convertValues: {
    [K in keyof NoInfer<TData>]?: (props: {
      line: Line;
    }) => TData[K] | undefined;
  };
  convertArrayValues?: {
    [K in keyof NoInfer<TData>]?: (props: {
      line: Line;
    }) => ArrayElement<TData[K]> | ArrayElement<TData[K]>[] | undefined;
  };
  childComponents?: {
    [K in keyof Partial<NoInfer<TData>>]: {
      icsComponent:
        | NoInfer<TNestedIcsComponent>
        | NoInfer<TNestedIcsComponent>[];
      convert: (
        childRawString: string,
        options: NoInfer<{
          data: Partial<TData>;
        }>
      ) => ArrayElement<TData[K]> & { nonStandard?: object };
    };
  };
  timezones?: IcsTimezone[];
  nonStandard?: ParseNonStandardValues<TNonStandard>;
};

export const _convertIcsComponent = <
  TData extends object & { nonStandard?: object },
  TNonStandard extends NonStandardValuesGeneric,
  TNestedIcsComponent extends IcsComponent
>(
  schema: StandardSchemaV1<TData> | undefined,
  rawString: string,
  options: ConvertIcsComponentProps<TData, TNonStandard, TNestedIcsComponent>
): TData => {
  const cleanedFileString = rawString.replace(
    createReplaceRegex(options?.icsComponent),
    ""
  );

  const childComponentIcsComponents = [
    ...new Set(
      Object.values<{
        icsComponent: IcsComponent | IcsComponent[];
      }>(options.childComponents || {}).flatMap(
        ({ icsComponent }) => icsComponent
      )
    ),
  ];

  const lineStrings = splitLines(
    childComponentIcsComponents.reduce((prevString, icsComponent) => {
      return prevString.replace(createGetRegex(icsComponent), "");
    }, cleanedFileString)
  );

  const data: Partial<TData> = {};

  const nonStandardValues: Record<string, Line> = {};

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine(lineString);

    if (valueIsNonStandard(property)) {
      nonStandardValues[property] = line;
    }

    const objectKey = options.objectKeyMap[property];

    if (!objectKey) return; // unknown Object key

    const convertArrayFunction = options.convertArrayValues?.[objectKey];

    if (convertArrayFunction) {
      const arrayValue = convertArrayFunction({ line });
      if (!arrayValue) return;

      if (
        data[objectKey] === undefined ||
        data[objectKey] === null ||
        !Array.isArray(data[objectKey])
      ) {
        data[objectKey] = [] as TData[keyof TData];
      }

      if (Array.isArray(arrayValue)) {
        // allow pushing multiple values at once
        (data[objectKey] as unknown[]).push(...arrayValue);
      } else {
        (data[objectKey] as unknown[]).push(arrayValue);
      }
      return;
    }

    const convertValue = options.convertValues?.[objectKey];

    if (convertValue) {
      const value = convertValue({ line });
      if (!value) return;

      data[objectKey] = value as TData[keyof TData];
      return;
    }

    data[objectKey] = line.value as TData[keyof TData]; // Set fallback string value
  });

  const childComponents = options.childComponents;

  if (childComponents && Object.keys(childComponents).length > 0) {
    (Object.keys(childComponents) as (keyof typeof childComponents)[]).forEach(
      (childComponentKey) => {
        const childComponentFunction =
          options.childComponents?.[childComponentKey];

        if (childComponentFunction) {
          const icsComponents = Array.isArray(
            childComponentFunction.icsComponent
          )
            ? childComponentFunction.icsComponent
            : [childComponentFunction.icsComponent];

          const childData: unknown[] = [];

          const rawChildStrings: RegExpExecArray[] = [];

          icsComponents.forEach((icsComponent) => {
            rawChildStrings.push(
              ...cleanedFileString.matchAll(createGetRegex(icsComponent))
            );
          });

          const childStrings = rawChildStrings.map((match) => match[0]);

          childStrings.forEach((childString) => {
            const childValue = childComponentFunction.convert(childString, {
              data,
            });

            if (!childValue) return;

            childData.push(childValue);
          });

          if (childData.length === 0) return;
          data[childComponentKey] = childData as TData[keyof TData];
        }
      }
    );
  }

  const validatedData = standardValidate(schema, data as TData);

  if (!options?.nonStandard) return validatedData;

  return convertNonStandardValues(
    validatedData,
    nonStandardValues,
    options?.nonStandard
  );
};
