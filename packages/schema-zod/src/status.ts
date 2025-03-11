import { icsStatusStringToStatus, ParseIcsStatus, statusTypes } from "ts-ics";
import { z } from "zod";

export const zStatusType = z.enum(statusTypes);

export const parseIcsStatus: ParseIcsStatus = (statusString) =>
  zStatusType.parse(icsStatusStringToStatus(statusString));
