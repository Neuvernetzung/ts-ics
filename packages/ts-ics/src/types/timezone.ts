import { type DateObject } from "./date";
import { type RecurrenceRule } from "./recurrenceRule";

export const timezonePropTypes = ["STANDARD", "DAYLIGHT"] as const;

export type VTimezonePropTypes = typeof timezonePropTypes;
export type VTimezonePropType = VTimezonePropTypes[number];

export type VTimezoneProp = {
  type: VTimezonePropType;
  start: Date;
  offsetTo: string;
  offsetFrom: string;
  recurrenceRule?: RecurrenceRule;
  comment?: string;
  recurrenceDate?: DateObject;
  name?: string;
};

export type VTimezone = {
  id: string;
  lastModified?: Date;
  url?: string;
  props: VTimezoneProp[];
};
