/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";
import { Bench } from "tinybench";

const bench = new Bench({ name: "Calendar Benchmark", time: 100 });

import { generateIcsCalendar } from "../packages/ts-ics/dist/index.cjs";
import { parseIcsCalendar } from "../packages/schema-zod/dist/index.cjs";

const file = readFileSync("benchmark/calendar.ics", "utf-8");

const parsed = parseIcsCalendar(file);

bench
  .add("parse Calendar", () => {
    parseIcsCalendar(file);
  })
  .add("generate Calendar", () => {
    generateIcsCalendar(parsed);
  });

await bench.run();

console.log(bench.table());

writeFileSync(
  "bench_result.json",
  JSON.stringify(
    bench.tasks.flatMap((t) => [
      {
        name: `${t.name} - latency`,
        unit: "ms",
        value: t.result.latency.mean.toFixed(3),
      },
      // {
      //   name: `${t.name} - throughput`,
      //   unit: "ops/s",
      //   value: t.result?.throughput.mean.toFixed(0),
      // },
    ])
  )
);
