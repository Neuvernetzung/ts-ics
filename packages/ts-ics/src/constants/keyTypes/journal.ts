import type { IcsJournalObjectKey } from "@/constants/keys/journal";

const timeStampKeys = [
  "stamp",
  "start",
  "created",
  "lastModified",
] satisfies IcsJournalObjectKey[];

type TimeStampKey = (typeof timeStampKeys)[number];

export const journalObjectKeyIsTimeStamp = (
  objectKey: IcsJournalObjectKey
): objectKey is TimeStampKey =>
  timeStampKeys.includes(objectKey as TimeStampKey);

const arrayOfStringKeys = ["categories"] satisfies IcsJournalObjectKey[];

type ArrayOfStringKey = (typeof arrayOfStringKeys)[number];

export const journalObjectKeyIsArrayOfStrings = (
  objectKey: IcsJournalObjectKey
): objectKey is ArrayOfStringKey =>
  arrayOfStringKeys.includes(objectKey as ArrayOfStringKey);

const textStringKeys = [
  "description",
  "comment",
  "summary",
] satisfies IcsJournalObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const journalObjectKeyIsTextString = (
  objectKey: IcsJournalObjectKey
): objectKey is TextStringKey =>
  textStringKeys.includes(objectKey as TextStringKey);
