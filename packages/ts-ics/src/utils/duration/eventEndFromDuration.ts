import { addDays, addHours, addMinutes, addSeconds, addWeeks } from "date-fns";

import type { IcsDuration } from "../../types";

export const getEventEndFromDuration = (start: Date, duration: IcsDuration) => {
  const directionMultiplier = duration.before ? -1 : 1;

  const seconds = (duration.seconds || 0) * directionMultiplier;
  const minutes = (duration.minutes || 0) * directionMultiplier;
  const hours = (duration.hours || 0) * directionMultiplier;
  const days = (duration.days || 0) * directionMultiplier;
  const weeks = (duration.weeks || 0) * directionMultiplier;

  return addWeeks(
    addDays(
      addHours(addMinutes(addSeconds(start, seconds), minutes), hours),
      days
    ),
    weeks
  );
};
