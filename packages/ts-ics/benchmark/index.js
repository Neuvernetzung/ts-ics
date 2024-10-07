/* eslint-disable no-console */
import { readFileSync } from "node:fs";

import { generateIcsCalendar, parseIcsCalendar } from "../dist/index.cjs";

const main = () => {
  const file = readFileSync("benchmark/calendar.ics", "utf-8");

  console.time("Parse");

  const parsed = parseIcsCalendar(file);

  console.timeEnd("Parse");

  console.time("Generate");

  generateIcsCalendar(parsed);

  console.timeEnd("Generate");
};

main();
