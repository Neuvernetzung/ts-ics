import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks,
} from "date-fns";

import type { IcsDuration } from "../../types";

export const getDurationFromInterval = (
  start: Date,
  end: Date
): IcsDuration => {
  const weeks = Math.abs(differenceInWeeks(end, start));
  const rawDays = Math.abs(differenceInDays(end, start));
  const days = rawDays - weeks * 7;
  const rawHours = Math.abs(differenceInHours(end, start));
  const hours = rawHours - rawDays * 24;
  const rawMinutes = Math.abs(differenceInMinutes(end, start));
  const minutes = rawMinutes - rawHours * 60;
  const rawSeconds = Math.abs(differenceInSeconds(end, start));
  const seconds = rawSeconds - rawMinutes * 60;

  return {
    before: start > end,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };
};
