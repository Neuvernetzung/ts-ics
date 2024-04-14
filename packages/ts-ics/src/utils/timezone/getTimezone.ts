import {
  compareAsc,
  millisecondsToHours,
  millisecondsToMinutes,
} from "date-fns";

import type { DateObjectTzProps, VTimezone } from "@/types";

import { extendTimezoneProps } from "./extendProps";
import { timeZoneOffsetToMilliseconds } from "./offsetToMilliseconds";
import { getOffsetFromTimezoneId } from "./getOffsetFromTimezoneId";

export const getTimezoneObjectOffset = (
  date: Date,
  tzid: string,
  timezones?: VTimezone[]
):
  | { offset: DateObjectTzProps["tzoffset"]; milliseconds: number }
  | undefined => {
  const vTimezone = timezones?.find((timezone) => timezone.id === tzid);

  if (vTimezone) {
    const sortedProps = extendTimezoneProps(date, vTimezone.props).sort(
      (a, b) => compareAsc(a.start, b.start)
    );

    for (let i = 0; i < sortedProps.length; i += 1) {
      if (date < sortedProps[i].start) {
        const icsOffset = sortedProps[i - 1]
          ? sortedProps[i - 1].offsetTo
          : sortedProps[i].offsetFrom;
        const offset =
          icsOffset.length > 5 ? icsOffset.substring(0, 5) : icsOffset;

        return { offset, milliseconds: timeZoneOffsetToMilliseconds(offset) };
      }
    }

    const icsOffset = sortedProps[sortedProps.length - 1].offsetTo;
    const offset = icsOffset.length > 5 ? icsOffset.substring(0, 5) : icsOffset;

    return { offset, milliseconds: timeZoneOffsetToMilliseconds(offset) };
  }

  const ianaTimezone = getOffsetFromTimezoneId(tzid, date);

  if (!Number.isNaN(ianaTimezone)) {
    const isNegative = ianaTimezone < 0;
    const hours = Math.abs(millisecondsToHours(ianaTimezone));
    const minutes = Math.abs(millisecondsToMinutes(ianaTimezone)) - hours * 60;

    const pHours =
      hours.toString().length === 1 ? `0${hours}` : hours.toString();
    const pMinutes =
      minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();

    return {
      offset: `${isNegative ? "-" : "+"}${pHours}${pMinutes}`,
      milliseconds: ianaTimezone,
    };
  }
};
