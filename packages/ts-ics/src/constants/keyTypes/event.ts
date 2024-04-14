import type { VEventObjectKey } from "@/constants/keys/event";

const timeStampKeys: VEventObjectKey[] = [
  "stamp",
  "start",
  "end",
  "created",
  "lastModified",
];

export const objectKeyIsTimeStamp = (objectKey: VEventObjectKey) =>
  timeStampKeys.includes(objectKey);

const arrayOfStringKeys: VEventObjectKey[] = ["categories"];

export const objectKeyIsArrayOfStrings = (objectKey: VEventObjectKey) =>
  arrayOfStringKeys.includes(objectKey);
