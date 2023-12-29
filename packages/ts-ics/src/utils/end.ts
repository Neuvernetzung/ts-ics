import type { VEvent } from "../types";
import { getEventEndFromDuration } from "./duration";

export const getEventEnd = (event: VEvent) =>
  event.end
    ? event.end.date
    : getEventEndFromDuration(event.start.date, event.duration);
