import type { LineToObject, ParseLineType } from "./parse";

export type Organizer = {
  name?: string;
  email: string;
  dir?: string;
  sentBy?: string;
};

export type OrganizerLineToObject = LineToObject<Organizer>;

export type ParseOrganizer = ParseLineType<Organizer>;
