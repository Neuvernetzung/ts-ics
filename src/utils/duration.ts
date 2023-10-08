import {
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  addWeeks,
  subDays,
  subHours,
  subMinutes,
  subSeconds,
  subWeeks,
} from "date-fns";
import type { VEventDuration } from "..";

export const getEventEndFromDuration = (
  start: Date,
  duration: VEventDuration
) =>
  duration.before
    ? subWeeks(
        subDays(
          subHours(
            subMinutes(
              subSeconds(start, duration.seconds || 0),
              duration.minutes || 0
            ),
            duration.hours || 0
          ),
          duration.days || 0
        ),
        duration.weeks || 0
      )
    : addWeeks(
        addDays(
          addHours(
            addMinutes(
              addSeconds(start, duration.seconds || 0),
              duration.minutes || 0
            ),
            duration.hours || 0
          ),
          duration.days || 0
        ),
        duration.weeks || 0
      );
