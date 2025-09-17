import type { IcsDuration } from "@/types";

export const generateIcsDuration = (duration: IcsDuration) => {
  if (Object.values(duration).filter((v) => typeof v === "number").length === 0)
    return;

  let icsString = "";

  if (duration.before) {
    icsString += "-";
  }

  icsString += "P";

  if (duration.weeks !== undefined) {
    icsString += `${duration.weeks}W`;
  }

  if (duration.days !== undefined) {
    icsString += `${duration.days}D`;
  }

  if (
    duration.hours !== undefined ||
    duration.minutes !== undefined ||
    duration.seconds !== undefined
  ) {
    icsString += "T";

    if (duration.hours !== undefined) {
      icsString += `${duration.hours}H`;
    }

    if (duration.minutes !== undefined) {
      icsString += `${duration.minutes}M`;
    }

    if (duration.seconds !== undefined) {
      icsString += `${duration.seconds}S`;
    }
  }

  return icsString;
};
