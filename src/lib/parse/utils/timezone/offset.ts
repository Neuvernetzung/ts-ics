export type UtcOffset = {
  positive: boolean;
  hourOffset: number;
  minuteOffset: number;
};

export const parseOffset = (offset: string): UtcOffset => {
  const regex = /^([\-+])?(\d{1,2})(:?(\d{2}))?(:?(\d{2}))?$/;
  const matches = offset.match(regex);

  if (!matches) throw new Error("Wrong offset format");

  const signStr = matches[1];
  const positive = signStr !== "-";

  const hourStr = matches[2];
  const hourOffset = parseInt(hourStr, 10);

  const minuteStr = matches[4];
  const minuteOffset = !minuteStr ? 0 : parseInt(minuteStr, 10);

  return { positive, hourOffset, minuteOffset };
};

export const hoursToMillis = (hours: number): number => hours * 60 * 60 * 1000;

export const minutesToMillis = (minutes: number): number => minutes * 60 * 1000;

export const getOffsetMillis = (offset: UtcOffset) =>
  (offset.positive ? 1 : -1) *
  (hoursToMillis(offset.hourOffset) + minutesToMillis(offset.minuteOffset));
