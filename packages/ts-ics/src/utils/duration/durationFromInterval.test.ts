import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
} from "date-fns";
import { getDurationFromInterval } from "./durationFromInterval";

const weeks = 1;
const days = 2;
const hours = 3;
const minutes = 4;
const seconds = 5;

it("Test getDurationFromInterval", async () => {
  const start = new Date("2023-09-01");
  const end = addWeeks(
    addDays(
      addHours(addMinutes(addSeconds(start, seconds), minutes), hours),
      days
    ),
    weeks
  );

  const duration = getDurationFromInterval(start, end);

  expect(duration.before).toBe(false);
  expect(duration.weeks).toBe(weeks);
  expect(duration.days).toBe(days);
  expect(duration.hours).toBe(hours);
  expect(duration.minutes).toBe(minutes);
  expect(duration.seconds).toBe(seconds);
});

it("Test getDurationFromInterval", async () => {
  const start = new Date("2023-09-01");
  const end = addWeeks(
    addDays(
      addHours(addMinutes(addSeconds(start, seconds), minutes), hours),
      days
    ),
    weeks
  );

  const duration = getDurationFromInterval(end, start);

  expect(duration.before).toBe(true);
  expect(duration.weeks).toBe(weeks);
  expect(duration.days).toBe(days);
  expect(duration.hours).toBe(hours);
  expect(duration.minutes).toBe(minutes);
  expect(duration.seconds).toBe(seconds);
});

const years = 1;
const months = 1;

it("Test getDurationFromInterval", async () => {
  const start = new Date("2023-09-01");
  const end = addYears(
    addMonths(
      addWeeks(
        addDays(
          addHours(addMinutes(addSeconds(start, seconds), minutes), hours),
          days
        ),
        weeks
      ),
      months
    ),
    years
  );

  const duration = getDurationFromInterval(start, end);

  expect(duration.before).toBe(false);
  expect(duration.weeks).toBe(57);
  expect(duration.days).toBe(6);
  expect(duration.hours).toBe(hours);
  expect(duration.minutes).toBe(minutes);
  expect(duration.seconds).toBe(seconds);
});
