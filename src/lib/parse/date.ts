import { z } from "zod";

export const icsDateToDate = (date: string): Date => {
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10) - 1; // Monate in JavaScript sind 0-basiert
  const day = parseInt(date.slice(6, 8), 10);

  // Erstellen Sie ein Date-Objekt mit den extrahierten Werten
  const newDate = new Date(year, month, day);

  return newDate;
};

export const parseIcsDate = (date: string) =>
  z.date().parse(icsDateToDate(date));

export const icsDateTimeToDateTime = (date: string) => {
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10) - 1; // Monate in JavaScript sind 0-basiert
  const day = parseInt(date.slice(6, 8), 10);
  const hour = parseInt(date.slice(9, 11), 10);
  const minute = parseInt(date.slice(11, 13), 10);
  const second = parseInt(date.slice(13, 15), 10);

  // Erstellen Sie ein Date-Objekt mit den extrahierten Werten
  const newDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  return newDate;
};

export const parseIcsDateTime = (date: string): Date =>
  z.date().parse(icsDateTimeToDateTime(date));
