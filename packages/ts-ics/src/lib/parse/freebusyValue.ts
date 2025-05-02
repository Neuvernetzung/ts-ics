import type { ConvertFreeBusyTime, FreeBusyType } from "@/types";
import { standardValidate } from "./utils/standardValidate";
import { convertIcsDateTime } from "./date";
import { convertIcsDuration } from "./duration";

export const convertIcsFreeBusyTime: ConvertFreeBusyTime = (schema, line) =>
  standardValidate(schema, {
    type: line.options?.FBTYPE as FreeBusyType | undefined,
    values: line.value.split(",").map((v) => {
      const [startString, durationOrEndString] = v.split("/");

      const start = convertIcsDateTime(undefined, { value: startString });

      if (durationOrEndString.startsWith("PT")) {
        const duration = convertIcsDuration(undefined, {
          value: durationOrEndString,
        });
        return { start, duration };
      }

      const end = convertIcsDateTime(undefined, { value: durationOrEndString });

      return { start, end };
    }),
  });
