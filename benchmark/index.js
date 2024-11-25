/* eslint-disable no-console */
import { readFileSync } from "node:fs";
import Benchmark from "benchmark";

const suite = new Benchmark.Suite();

import {
  generateIcsCalendar,
  parseIcsCalendar,
} from "../packages/ts-ics/dist/index.cjs";

const file = readFileSync("benchmark/calendar.ics", "utf-8");

const parsed = parseIcsCalendar(file);

suite
  .add("parse Calendar", () => {
    parseIcsCalendar(file);
  })
  .add("generate Calendar", () => {
    generateIcsCalendar(parsed);
  })
  .on("cycle", (event) => {
    // Output benchmark result by converting benchmark result to string
    console.log(String(event.target));
  })
  .run();
