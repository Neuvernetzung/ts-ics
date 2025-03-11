import { type DateObject } from "./date";

export type RecurrenceId = {
  range?: "THISANDFUTURE";
  value: DateObject;
};
