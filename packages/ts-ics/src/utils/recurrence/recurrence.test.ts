import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
  getDate,
  getDay,
  getDayOfYear,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getWeek,
} from "date-fns";

import { icsRecurrenceRuleToObject } from "@/lib";

import { extendByRecurrenceRule } from ".";

it("Test extendByRecurrenceRule - Daily for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 5, 17));

  const ruleString = "FREQ=DAILY;COUNT=10";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
});

it("Test extendByRecurrenceRule - Daily until December 24, 2023", async () => {
  const start = new Date(Date.UTC(2023, 10, 5));

  const ruleString = "FREQ=DAILY;UNTIL=20231224T000000Z";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(50);
});

it("Test extendByRecurrenceRule - Every other day - forever", async () => {
  const start = new Date(Date.UTC(2023, 10, 5));

  const ruleString = "FREQ=DAILY;INTERVAL=2";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(366);
  dates.forEach((date, i) => {
    expect(addDays(start, i * (rule.interval || 1))).toEqual(date);
  });
});

it("Test extendByRecurrenceRule - Every 10 days, 5 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 10, 5));

  const ruleString = "FREQ=DAILY;INTERVAL=10;COUNT=5";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(5);
  dates.forEach((date, i) => {
    expect(addDays(start, i * (rule.interval || 1))).toEqual(date);
  });
});

it("Test extendByRecurrenceRule - Every day in January, for 3 years - V1", async () => {
  const start = new Date(Date.UTC(2023, 0, 1));

  const ruleString = "FREQ=DAILY;UNTIL=20250131T140000Z;BYMONTH=1";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(93);
  dates.forEach((date) => {
    expect(getMonth(date)).toEqual(0);
  });
});

it("Test extendByRecurrenceRule - Every day in January, for 3 years - V2", async () => {
  const start = new Date(Date.UTC(2023, 0, 1));

  const ruleString =
    "FREQ=YEARLY;UNTIL=20250131T140000Z;BYMONTH=1;BYDAY=SU,MO,TU,WE,TH,FR,SA";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(93);
  dates.forEach((date) => {
    expect(getMonth(date)).toEqual(0);
  });
});

it("Test extendByRecurrenceRule - Weekly for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 0, 1));

  const ruleString = "FREQ=WEEKLY;COUNT=10";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((date, i) => {
    expect(addWeeks(start, i * (rule.interval || 1))).toEqual(date);
  });
});

it("Test extendByRecurrenceRule - Weekly until December 24, 2023", async () => {
  const start = new Date(Date.UTC(2023, 10, 5));

  const ruleString = "FREQ=WEEKLY;UNTIL=20231224T000000Z";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(8);
});

it("Test extendByRecurrenceRule - Every other week - forever", async () => {
  const start = new Date(Date.UTC(2023, 10, 5));

  const ruleString = "FREQ=WEEKLY;INTERVAL=2;WKST=SU";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(53);
});

it("Test extendByRecurrenceRule - Weekly on Tuesday and Thursday for five weeks - Workstart SUN - V1", async () => {
  const start = new Date(Date.UTC(2023, 8, 2));

  const ruleString = "FREQ=WEEKLY;UNTIL=20231007T000000Z;WKST=SU;BYDAY=TU,TH";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((d) => expect([2, 4]).toContain(getDay(d)));
});

it("Test extendByRecurrenceRule - Weekly on Tuesday and Thursday for five weeks - Workstart SUN - V2", async () => {
  const start = new Date(Date.UTC(2023, 8, 2));

  const ruleString = "FREQ=WEEKLY;COUNT=10;WKST=SU;BYDAY=TU,TH";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((d) => expect([2, 4]).toContain(getDay(d)));
});

it("Test extendByRecurrenceRule - Every other week on Monday, Wednesday, and Friday until December 24, 2023, starting on September 1, 2023 - Workstart SUN", async () => {
  const start = new Date(Date.UTC(2023, 8, 1));

  const ruleString =
    "FREQ=WEEKLY;INTERVAL=2;UNTIL=20231224T000000Z;WKST=SU;BYDAY=MO,WE,FR";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(25);
  dates.forEach((d) => expect([1, 3, 5]).toContain(getDay(d)));
});

it("Test extendByRecurrenceRule - Every other week on Tuesday and Thursday, for 8 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 8, 1));

  const ruleString = "FREQ=WEEKLY;INTERVAL=2;COUNT=8;WKST=SU;BYDAY=TU,TH";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(8);
  dates.forEach((d) => expect([2, 4]).toContain(getDay(d)));
});

it("Test extendByRecurrenceRule - Monthly on the first Friday for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 8, 1));

  const ruleString = "FREQ=MONTHLY;COUNT=10;BYDAY=1FR";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect(5).toEqual(getDay(d));
  });
  dates.forEach((d, i) => {
    expect(getMonth(d)).toEqual(getMonth(addMonths(start, i)));
  });
});

it("Test extendByRecurrenceRule - Monthly on the first Friday until December 24, 2023", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;UNTIL=20231224T000000Z;BYDAY=1FR";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(3);
  dates.forEach((d) => {
    expect(5).toEqual(getDay(d));
  });
  dates.forEach((d, i) => {
    expect(getMonth(d)).toEqual(getMonth(addMonths(start, i)));
  });
});

it("Test extendByRecurrenceRule - Every other month on the first and last Sunday of the month for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;INTERVAL=2;COUNT=10;BYDAY=1SU,-1SU";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect(0).toEqual(getDay(d));
  });
});

it("Test extendByRecurrenceRule - Monthly on the second-to-last Monday of the month for 6 months", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;COUNT=6;BYDAY=-2MO";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(6);
  dates.forEach((d) => {
    expect(1).toEqual(getDay(d));
  });
});

it("Test extendByRecurrenceRule - Monthly on the third-to-the-last day of the month, forever", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;BYMONTHDAY=-3";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(24);
});

it("Test extendByRecurrenceRule - Monthly on the 2nd and 15th of the month for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;COUNT=10;BYMONTHDAY=2,15";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect([2, 15]).toContain(getDate(d));
  });
});

it("Test extendByRecurrenceRule - Monthly on the first and last day of the month for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;COUNT=10;BYMONTHDAY=1,-1";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
});

it("Test extendByRecurrenceRule - Every 18 months on the 10th thru 15th of the month for 10 occurrence", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString =
    "FREQ=MONTHLY;INTERVAL=18;COUNT=10;BYMONTHDAY=10,11,12,13,14,15";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect([10, 11, 12, 13, 14, 15]).toContain(getDate(d));
  });
  dates.forEach((date, i) =>
    i < 6
      ? expect(getMonth(date)).toEqual(getMonth(start))
      : expect(getMonth(date)).toEqual(getMonth(addMonths(start, 18)))
  );
});

it("Test extendByRecurrenceRule - Every Tuesday, every other month", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=MONTHLY;INTERVAL=2;BYDAY=TU";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, { start });

  expect(dates.length).toBe(52);
  dates.forEach((d) => {
    expect([2]).toContain(getDay(d));
  });
});

it("Test extendByRecurrenceRule - Yearly in June and July for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=YEARLY;COUNT=10;BYMONTH=6,7";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addYears(start, 6),
  });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect([5, 6]).toContain(getMonth(d));
  });
});

it("Test extendByRecurrenceRule - Every other year on January, February, and March for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=YEARLY;INTERVAL=2;COUNT=10;BYMONTH=1,2,3";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addYears(start, 8),
  });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect([0, 1, 2]).toContain(getMonth(d));
  });
});

it("Test extendByRecurrenceRule - Every third year on the 1st, 100th, and 200th day for 10 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));

  const ruleString = "FREQ=YEARLY;INTERVAL=3;COUNT=10;BYYEARDAY=1,100,200";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addYears(start, 12),
  });

  expect(dates.length).toBe(10);
  dates.forEach((d) => {
    expect([1, 100, 200]).toContain(getDayOfYear(d));
  });
});

it("Test extendByRecurrenceRule - Every 20th Monday of the year, forever - V1", async () => {
  const start = new Date(Date.UTC(2023, 1, 5));

  const ruleString = "FREQ=YEARLY;BYDAY=20MO";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(2);
  dates.forEach((d) => {
    expect([1]).toContain(getDay(d));
  });
});

it("Test extendByRecurrenceRule - Every 20th Monday of the year, forever - V2", async () => {
  const start = new Date(Date.UTC(2023, 1, 5));

  const ruleString = "FREQ=YEARLY;BYWEEKNO=20;BYDAY=MO";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(2);
  dates.forEach((d) => {
    expect([1]).toContain(getDay(d));
    expect(getWeek(d, { weekStartsOn: 1 })).toEqual(20);
  });
});

it("Test extendByRecurrenceRule - Every Thursday in March, forever", async () => {
  const start = new Date(Date.UTC(2023, 1, 5));
  const ruleString = "FREQ=YEARLY;BYMONTH=3;BYDAY=TH";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(9);
  dates.forEach((d) => {
    expect([4]).toContain(getDay(d));
    expect(2).toEqual(getMonth(d));
  });
});

it("Test extendByRecurrenceRule - Every Thursday, but only during June, July, and August, forever", async () => {
  const start = new Date(Date.UTC(2023, 1, 5));
  const ruleString = "FREQ=YEARLY;BYDAY=TH;BYMONTH=6,7,8";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(27);
  dates.forEach((d) => {
    expect([4]).toContain(getDay(d));
    expect([5, 6, 7]).toContain(getMonth(d));
  });
});

it("Test extendByRecurrenceRule - Every Friday the 13th, forever", async () => {
  const start = new Date(Date.UTC(2023, 1, 5));
  const ruleString = "FREQ=MONTHLY;BYDAY=FR;BYMONTHDAY=13";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(3);
  dates.forEach((d) => {
    expect([5]).toContain(getDay(d));
    expect([13]).toContain(getDate(d));
  });
});

it("Test extendByRecurrenceRule - The first Saturday that follows the first Sunday of the month, forever", async () => {
  const start = new Date(Date.UTC(2023, 1, 5));
  const ruleString = "FREQ=MONTHLY;BYDAY=SA;BYMONTHDAY=7,8,9,10,11,12,13";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(24);
  dates.forEach((d) => {
    expect([6]).toContain(getDay(d));
    expect([7, 8, 9, 10, 11, 12, 13]).toContain(getDate(d));
  });
});

it("Test extendByRecurrenceRule - Every 4 years, the first Tuesday after a Monday in November, forever", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString =
    "FREQ=YEARLY;INTERVAL=4;BYMONTH=11;BYDAY=TU;BYMONTHDAY=2,3,4,5,6,7,8";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addYears(start, 5),
  });

  expect(dates.length).toBe(2);
  dates.forEach((d) => {
    expect([2]).toContain(getDay(d));
    expect([2, 3, 4, 5, 6, 7, 8]).toContain(getDate(d));
    expect([10]).toContain(getMonth(d));
  });
});

it("Test extendByRecurrenceRule - The third instance into the month of one of Tuesday, Wednesday, or Thursday, for the next 3 months", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString = "FREQ=MONTHLY;COUNT=3;BYDAY=TU,WE,TH;BYSETPOS=3";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(3);
  dates.forEach((d) => {
    expect([2, 3, 4]).toContain(getDay(d));
  });
});

it("Test extendByRecurrenceRule - The second-to-last weekday of the month", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString = "FREQ=MONTHLY;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-2";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(24);
  dates.forEach((d) => {
    expect([1, 2, 3, 4, 5]).toContain(getDay(d));
  });
});

it("Test extendByRecurrenceRule - Every 3 hours from 9:00 AM to 5:00 PM on a specific day", async () => {
  const start = new Date(Date.UTC(2023, 9, 5, 9));
  const ruleString = "FREQ=HOURLY;INTERVAL=3;UNTIL=20231005T180000Z";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(4);
  dates.forEach((date, i) =>
    expect(getHours(date)).toEqual(getHours(addHours(start, i * 3)))
  );
});

it("Test extendByRecurrenceRule - Every 15 minutes for 6 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString = "FREQ=MINUTELY;INTERVAL=15;COUNT=6";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(6);
  dates.forEach((date, i) => expect(date).toEqual(addMinutes(start, i * 15)));
});

it("Test extendByRecurrenceRule - Every hour and a half for 4 occurrences", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString = "FREQ=MINUTELY;INTERVAL=90;COUNT=4";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(4);
  dates.forEach((date, i) => expect(date).toEqual(addMinutes(start, i * 90)));
});

it("Test extendByRecurrenceRule - Every 20 minutes from 9:00 AM to 4:40 PM every day - V1", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString =
    "FREQ=DAILY;BYHOUR=9,10,11,12,13,14,15,16;BYMINUTE=0,20,40";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addDays(start, 1),
  });

  expect(dates.length).toBe(24);
  dates.forEach((date) => {
    expect([9, 10, 11, 12, 13, 14, 15, 16]).toContain(getHours(date));
    expect([0, 20, 40]).toContain(getMinutes(date));
  });
});

it("Test extendByRecurrenceRule - Every 20 minutes from 9:00 AM to 4:40 PM every day - V2", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString = "FREQ=MINUTELY;INTERVAL=20;BYHOUR=9,10,11,12,13,14,15,16";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addDays(start, 1),
  });

  expect(dates.length).toBe(24);
  dates.forEach((date) => {
    expect([9, 10, 11, 12, 13, 14, 15, 16]).toContain(getHours(date));
    expect([0, 20, 40]).toContain(getMinutes(date));
  });
});

it("Test extendByRecurrenceRule - Every 20 seconds from 9:15 AM to 9:20 AM every day", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleString = "FREQ=DAILY;BYMINUTE=15,16,17,18,19;BYSECOND=0,20,40";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end: addDays(start, 1),
  });

  expect(dates.length).toBe(15);
  dates.forEach((date) => {
    expect([15, 16, 17, 18, 19]).toContain(getMinutes(date));
    expect([0, 20, 40]).toContain(getSeconds(date));
  });
});

it("Test extendByRecurrenceRule - An example where the days generated makes a difference because of WKST", async () => {
  const start = new Date(Date.UTC(2023, 9, 5));
  const ruleStringMo = "FREQ=WEEKLY;INTERVAL=2;COUNT=4;BYDAY=TU,SU;WKST=MO";

  const ruleMo = icsRecurrenceRuleToObject({ value: ruleStringMo }, undefined);

  const datesMo = extendByRecurrenceRule(ruleMo, {
    start,
  });

  expect(datesMo.length).toBe(4);
  datesMo.forEach((date) => expect([0, 2]).toContain(getDay(date)));

  const ruleStringSu = "FREQ=WEEKLY;INTERVAL=2;COUNT=4;BYDAY=TU,SU;WKST=SU";

  const ruleSu = icsRecurrenceRuleToObject({ value: ruleStringSu }, undefined);

  const datesSu = extendByRecurrenceRule(ruleSu, {
    start,
  });

  expect(datesSu.length).toBe(4);
  datesSu.forEach((date) => expect([0, 2]).toContain(getDay(date)));

  expect(datesMo).not.toEqual(datesSu);
});

it("Test extendByRecurrenceRule - An example where an invalid date (i.e., February 30) is ignored", async () => {
  const start = new Date(Date.UTC(2023, 1, 1));
  const ruleString = "FREQ=MONTHLY;BYMONTHDAY=15,30;COUNT=5";

  const rule = icsRecurrenceRuleToObject({ value: ruleString }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
  });

  expect(dates.length).toBe(5);
  dates.forEach((date) => {
    if (getMonth(date) === 1) {
      expect(30).not.toEqual(getDate(date));
    } else {
      expect([15, 30]).toContain(getDate(date));
    }
  });
});

it("Test extendByRecurrenceRule - Every Friday the 13th except first and last", async () => {
  const start = new Date(2024, 1, 1);
  const end = new Date(2027, 1, 1);
  const exceptions = [new Date(2024, 8, 13), new Date(2026, 10, 13)];
  const value = "FREQ=MONTHLY;BYDAY=FR;BYMONTHDAY=13";

  const rule = icsRecurrenceRuleToObject({ value }, undefined);

  const dates = extendByRecurrenceRule(rule, {
    start,
    end,
    exceptions,
  });

  expect(dates.length).toBe(4);
  expect(dates[0]).not.toEqual(exceptions[0]);
  expect(dates[4]).not.toEqual(exceptions[1]);
});
