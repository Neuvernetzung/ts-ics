import type { IcsEventObjectKey } from "@/constants/keys/event";

const timeStampKeys = [
  "stamp",
  "start",
  "end",
  "created",
  "lastModified",
] satisfies IcsEventObjectKey[];

type TimeStampKey = (typeof timeStampKeys)[number];

export const objectKeyIsTimeStamp = (
  objectKey: IcsEventObjectKey
): objectKey is TimeStampKey =>
  timeStampKeys.includes(objectKey as TimeStampKey);

const arrayOfStringKeys = ["categories"] satisfies IcsEventObjectKey[];

type ArrayOfStringKey = (typeof arrayOfStringKeys)[number];

export const objectKeyIsArrayOfStrings = (
  objectKey: IcsEventObjectKey
): objectKey is ArrayOfStringKey =>
  arrayOfStringKeys.includes(objectKey as ArrayOfStringKey);

const textStringKeys = [
  "description",
  "location",
  "comment",
  "summary",
] satisfies IcsEventObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const objectKeyIsTextString = (
  objectKey: IcsEventObjectKey
): objectKey is TextStringKey =>
  textStringKeys.includes(objectKey as TextStringKey);
