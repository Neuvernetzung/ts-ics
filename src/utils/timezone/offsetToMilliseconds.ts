export const timeZoneOffsetToMilliseconds = (offset: string) => {
  const sign = offset[0] === "+" ? 1 : -1;
  const hours = Number(offset.slice(1, 3));
  const minutes = offset.length > 3 ? Number(offset.slice(3, 5)) : 0;
  const seconds = offset.length > 5 ? Number(offset.slice(5, 7)) : 0;
  const milliseconds = ((hours * 60 + minutes) * 60 + seconds) * 1000 * sign;

  return milliseconds;
};
