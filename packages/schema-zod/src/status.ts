import { icsStatusStringToStatus, Line, statusTypes } from "ts-ics";
import { z } from "zod";

export const zStatusType = z.enum(statusTypes);

export const parseIcsStatus = (line: Line) =>
  icsStatusStringToStatus(line, zStatusType);
