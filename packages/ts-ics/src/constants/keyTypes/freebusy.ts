import type { IcsFreeBusyObjectKey } from "@/constants/keys/freebusy";

const timeStampKeys = [
  "stamp",
  "start",
  "end",
] satisfies IcsFreeBusyObjectKey[];

type TimeStampKey = (typeof timeStampKeys)[number];

export const freeBusyObjectKeyIsTimeStamp = (
  objectKey: IcsFreeBusyObjectKey
): objectKey is TimeStampKey =>
  timeStampKeys.includes(objectKey as TimeStampKey);

const textStringKeys = ["comment"] satisfies IcsFreeBusyObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const freeBusyObjectKeyIsTextString = (
  objectKey: IcsFreeBusyObjectKey
): objectKey is TextStringKey =>
  textStringKeys.includes(objectKey as TextStringKey);
