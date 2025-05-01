import type { IcsTodoObjectKey } from "@/constants/keys/todo";

const timeStampKeys = [
  "stamp",
  "start",
  "due",
  "created",
  "lastModified",
] satisfies IcsTodoObjectKey[];

type TimeStampKey = (typeof timeStampKeys)[number];

export const todoObjectKeyIsTimeStamp = (
  objectKey: IcsTodoObjectKey
): objectKey is TimeStampKey =>
  timeStampKeys.includes(objectKey as TimeStampKey);

const arrayOfStringKeys = ["categories"] satisfies IcsTodoObjectKey[];

type ArrayOfStringKey = (typeof arrayOfStringKeys)[number];

export const todoObjectKeyIsArrayOfStrings = (
  objectKey: IcsTodoObjectKey
): objectKey is ArrayOfStringKey =>
  arrayOfStringKeys.includes(objectKey as ArrayOfStringKey);

const textStringKeys = [
  "description",
  "location",
  "comment",
  "summary",
] satisfies IcsTodoObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const todoObjectKeyIsTextString = (
  objectKey: IcsTodoObjectKey
): objectKey is TextStringKey =>
  textStringKeys.includes(objectKey as TextStringKey);
