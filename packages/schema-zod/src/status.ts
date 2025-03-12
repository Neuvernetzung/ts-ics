import { convertIcsStatus, type ParseStatus, statusTypes } from "ts-ics";
import { z } from "zod";

export const zIcsStatusType = z.enum(statusTypes);

export const parseIcsStatus: ParseStatus = (...props) =>
  convertIcsStatus(zIcsStatusType, ...props);
