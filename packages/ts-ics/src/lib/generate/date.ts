import isDate from "lodash/isDate";

export const generateIcsDate = (date: Date) => {
  if (!isDate(date)) throw Error(`Incorrect date object: ${date}`);

  const isoDate = date.toISOString();

  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const d = isoDate.slice(8, 10);

  return `${year}${month}${d}`;
};

export const generateIcsDateTime = (date: Date) => {
  if (!isDate(date)) throw Error(`Incorrect date object: ${date}`);

  const isoDate = date.toISOString();

  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const d = isoDate.slice(8, 10);
  const hour = isoDate.slice(11, 13);
  const minutes = isoDate.slice(14, 16);
  const seconds = isoDate.slice(17, 19);

  return `${year}${month}${d}T${hour}${minutes}${seconds}Z`;
};
