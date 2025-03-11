export const attendeePartStatusTypes = [
  "NEEDS-ACTION",
  "ACCEPTED",
  "DECLINED",
  "TENTATIVE",
  "DELEGATED",
] as const;

export type AttendeePartStatusTypes = typeof attendeePartStatusTypes;
export type AttendeePartStatusType = AttendeePartStatusTypes[number];

export type Attendee = {
  email: string;
  name?: string;
  member?: string;
  delegatedFrom?: string;
  role?: string;
  partstat?: AttendeePartStatusType;
  dir?: string;
  sentBy?: string;
};
