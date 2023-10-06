import set from "lodash/set";

import { VEventDuration, zVEventDuration } from "@/types";

export const icsDurationToObject = (durationString: string): VEventDuration => {
  let newString = durationString;

  const duration = {};

  if (newString[0] === "-") {
    set(duration, "before", true);
    newString = newString.slice(1);
  }
  newString = newString.slice(1); // P entfernen

  const parts = newString.split("T");

  let datePart = parts[0];

  if (datePart.includes("D")) {
    const [days, rest] = datePart.split("D");

    set(duration, "days", Number(days));
    datePart = rest;
  }

  if (datePart.includes("W")) {
    const [weeks, rest] = datePart.split("W");

    set(duration, "weeks", Number(weeks));
    datePart = rest;
  }

  let timePart = parts[1];

  if (timePart) {
    if (timePart.includes("H")) {
      const [hours, rest] = timePart.split("H");

      set(duration, "hours", Number(hours));
      timePart = rest;
    }

    if (timePart.includes("M")) {
      const [minutes, rest] = timePart.split("M");

      set(duration, "minutes", Number(minutes));
      timePart = rest;
    }

    if (timePart.includes("S")) {
      const [seconds, rest] = timePart.split("S");

      set(duration, "seconds", Number(seconds));
      timePart = rest;
    }
  }

  return duration as VEventDuration;
};

export const parseIcsDuration = (durationString: string) =>
  zVEventDuration.parse(icsDurationToObject(durationString));
