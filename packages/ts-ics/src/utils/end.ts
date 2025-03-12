import type { IcsEvent } from "../types";
import { getEventEndFromDuration } from "./duration";

export const getEventEnd = (event: IcsEvent) =>
  event.end
    ? event.end.date
    : getEventEndFromDuration(event.start.date, event.duration);
