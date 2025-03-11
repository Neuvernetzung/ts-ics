import type { Duration } from "@/types";

export const generateIcsDuration = (duration: Duration) => {
  let icsString = "";

  if (duration.before) {
    icsString += "-";
  }

  icsString += "P";

  if (duration.weeks) {
    icsString += `${duration.weeks}W`;
  }

  if (duration.days) {
    icsString += `${duration.days}D`;
  }

  if (duration.hours || duration.minutes || duration.seconds) {
    icsString += "T";

    if (duration.hours) {
      icsString += `${duration.hours}H`;
    }

    if (duration.minutes) {
      icsString += `${duration.minutes}M`;
    }

    if (duration.seconds) {
      icsString += `${duration.seconds}S`;
    }
  }

  return icsString;
};
