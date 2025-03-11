import {
  timeTransparentTypes,
  zTimeTransparentType,
  type TimeTransparentType,
} from "@/types";

export type ParseIcsTimeTransparent = (
  TimeTransparentString: string
) => TimeTransparentType | undefined;

export const icsTimeTransparentStringToTimeTransparent: ParseIcsTimeTransparent =
  (TimeTransparentString) => {
    if (!TimeTransparentString) return;

    if (
      timeTransparentTypes.includes(
        TimeTransparentString as TimeTransparentType
      )
    )
      return TimeTransparentString as TimeTransparentType;

    return;
  };

export const parseIcsTimeTransparent: ParseIcsTimeTransparent = (
  TimeTransparentString
) =>
  zTimeTransparentType.parse(
    icsTimeTransparentStringToTimeTransparent(TimeTransparentString)
  );
