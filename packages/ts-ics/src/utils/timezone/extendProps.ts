import type { VTimezoneProp } from "@/types";

import { extendByRecurrenceRule } from "../recurrence";

export const extendTimezoneProps = (
  date: Date,
  timezoneProps: VTimezoneProp[]
): VTimezoneProp[] =>
  timezoneProps
    .flatMap((timezoneProp) => {
      if (!timezoneProp.recurrenceRule) return timezoneProp;
      if (
        timezoneProp.recurrenceRule.until &&
        timezoneProp.recurrenceRule.until.date < date
      )
        return timezoneProp;

      const extended = extendByRecurrenceRule(timezoneProp.recurrenceRule, {
        start: timezoneProp.start,
        end: date,
      }).map((date) => ({ ...timezoneProp, start: date }));

      return extended;
    });
