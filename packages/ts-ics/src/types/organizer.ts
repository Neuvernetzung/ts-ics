import type { ConvertLineType, ParseLineType } from "./parse";

export type Organizer = {
  name?: string;
  email: string;
  dir?: string;
  sentBy?: string;
};

export type ConvertOrganizer = ConvertLineType<Organizer>;

export type ParseOrganizer = ParseLineType<Organizer>;
