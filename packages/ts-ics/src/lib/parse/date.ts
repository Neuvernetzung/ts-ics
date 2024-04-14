import { z } from "zod";

import type { VTimezone } from "@/types";

export const icsDateToDate = (date: string): Date => {
  const year = Number.parseInt(date.slice(0, 4), 10);
  const month = Number.parseInt(date.slice(4, 6), 10) - 1; // Monate in JavaScript sind 0-basiert
  const day = Number.parseInt(date.slice(6, 8), 10);

  // Erstellen Sie ein Date-Objekt mit den extrahierten Werten
  const newDate = new Date(year, month, day);

  return newDate;
};

export const parseIcsDate = (date: string) =>
  z.date().parse(icsDateToDate(date));

export type ParseIcsDateTime = (date: string, timezones?: VTimezone[]) => Date;

export const icsDateTimeToDateTime: ParseIcsDateTime = (date) => {
  const year = Number.parseInt(date.slice(0, 4), 10);
  const month = Number.parseInt(date.slice(4, 6), 10) - 1; // Monate in JavaScript sind 0-basiert
  const day = Number.parseInt(date.slice(6, 8), 10);
  const hour = Number.parseInt(date.slice(9, 11), 10);
  const minute = Number.parseInt(date.slice(11, 13), 10);
  const second = Number.parseInt(date.slice(13, 15), 10);

  const newDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  return newDate;
};

export const parseIcsDateTime: ParseIcsDateTime = (date, timezones): Date =>
  z.date().parse(icsDateTimeToDateTime(date, timezones));
