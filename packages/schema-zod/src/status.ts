import {
  convertIcsEventStatus,
  type ParseEventStatus,
  eventStatusTypes,
  todoStatusTypes,
  type ParseTodoStatus,
  convertIcsTodoStatus,
  journalStatusTypes,
  convertIcsJournalStatus,
  type ParseJournalStatus,
} from "ts-ics";
import { z } from "zod";

export const zIcsEventStatusType = z.enum(eventStatusTypes);

export const parseIcsEventStatus: ParseEventStatus = (...props) =>
  convertIcsEventStatus(zIcsEventStatusType, ...props);

export const zIcsTodoStatusType = z.enum(todoStatusTypes);

export const parseIcsTodoStatus: ParseTodoStatus = (...props) =>
  convertIcsTodoStatus(zIcsTodoStatusType, ...props);

export const zIcsJournalStatusType = z.enum(journalStatusTypes);

export const parseIcsJournalStatus: ParseJournalStatus = (...props) =>
  convertIcsJournalStatus(zIcsJournalStatusType, ...props);
