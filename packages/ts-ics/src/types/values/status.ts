import type { ConvertLineType, ParseLineType } from "../parse";

// VEVENT
export const eventStatusTypes = [
  "TENTATIVE",
  "CONFIRMED",
  "CANCELLED",
] as const;

export type IcsEventStatusTypes = typeof eventStatusTypes;
export type IcsEventStatusType = IcsEventStatusTypes[number];

export type ConvertEventStatus = ConvertLineType<IcsEventStatusType>;

export type ParseEventStatus = ParseLineType<IcsEventStatusType>;

// VTODO
export const todoStatusTypes = [
  "NEEDS-ACTION",
  "COMPLETED",
  "IN-PROGRESS",
  "CANCELLED",
] as const;

export type IcsTodoStatusTypes = typeof todoStatusTypes;
export type IcsTodoStatusType = IcsTodoStatusTypes[number];

export type ConvertTodoStatus = ConvertLineType<IcsTodoStatusType>;

export type ParseTodoStatus = ParseLineType<IcsTodoStatusType>;

// VJOURNAL
export const journalStatusTypes = ["DRAFT", "FINAL", "CANCELLED"] as const;

export type IcsJournalStatusTypes = typeof journalStatusTypes;
export type IcsJournalStatusType = IcsJournalStatusTypes[number];

export type ConvertJournalStatus = ConvertLineType<IcsJournalStatusType>;

export type ParseJournalStatus = ParseLineType<IcsJournalStatusType>;
