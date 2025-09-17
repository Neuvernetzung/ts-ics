import type { ConvertLineType, ParseLineType } from "../parse";

export type IcsOrganizer = {
  name?: string;
  email: string;
  dir?: string;
  sentBy?: string;
};

export type ConvertOrganizer = ConvertLineType<IcsOrganizer>;

export type ParseOrganizer = ParseLineType<IcsOrganizer>;
