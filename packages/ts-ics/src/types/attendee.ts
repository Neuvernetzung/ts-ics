import type { ConvertLineType, ParseLineType } from "./parse";

export const attendeePartStatusTypes = [
  "NEEDS-ACTION",
  "ACCEPTED",
  "DECLINED",
  "TENTATIVE",
  "DELEGATED",
] as const;

export type IcsAttendeePartStatusTypes = typeof attendeePartStatusTypes;
export type IcsAttendeePartStatusType = IcsAttendeePartStatusTypes[number];

export type IcsAttendee = {
  email: string;
  name?: string;
  member?: string;
  delegatedFrom?: string;
  role?: string;
  partstat?: IcsAttendeePartStatusType;
  dir?: string;
  sentBy?: string;
};

export type ConvertAttendee = ConvertLineType<IcsAttendee>;

export type ParseAttendee = ParseLineType<IcsAttendee>;
