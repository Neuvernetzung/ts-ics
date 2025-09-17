import { OBJECT_END, OBJECT_START } from "../keys";

export const createGetRegex = (key: string) =>
  new RegExp(`${OBJECT_START}:${key}([\\s\\S]*?)${OBJECT_END}:${key}`, "g");

export const createReplaceRegex = (key: string) =>
  new RegExp(`${OBJECT_START}:${key}|${OBJECT_END}:${key}`, "g");
