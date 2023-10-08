import { getEventEndFromDuration, type VEvent } from "..";

export const getEventEnd = (event: VEvent) =>
  event.end
    ? event.end.date
    : getEventEndFromDuration(event.start.date, event.duration);
