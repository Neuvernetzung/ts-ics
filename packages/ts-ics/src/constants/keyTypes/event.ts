import type { VEventObjectKey } from "@/constants/keys/event";

const timeStampKeys = [
  "stamp",
  "start",
  "end",
  "created",
  "lastModified",
] satisfies VEventObjectKey[];

type TimeStampKey = (typeof timeStampKeys)[number];

export const objectKeyIsTimeStamp = (
  objectKey: VEventObjectKey
): objectKey is TimeStampKey =>
  timeStampKeys.includes(objectKey as TimeStampKey);

const arrayOfStringKeys = ["categories"] satisfies VEventObjectKey[];

type ArrayOfStringKey = (typeof arrayOfStringKeys)[number];

export const objectKeyIsArrayOfStrings = (
  objectKey: VEventObjectKey
): objectKey is ArrayOfStringKey =>
  arrayOfStringKeys.includes(objectKey as ArrayOfStringKey);

const textStringKeys = [
  "description",
  "location",
  "comment",
  "summary",
] satisfies VEventObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const objectKeyIsTextString = (
  objectKey: VEventObjectKey
): objectKey is TextStringKey =>
  textStringKeys.includes(objectKey as TextStringKey);
