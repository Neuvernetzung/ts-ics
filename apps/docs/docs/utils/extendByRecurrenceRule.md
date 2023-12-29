# extendByRecurrenceRule

```ts
import { extendByRecurrenceRule } from "ts-ics";

const start = new Date(Date.UTC(2023, 9, 5));
const ruleString = "FREQ=DAILY;BYMINUTE=15,16,17,18,19;BYSECOND=0,20,40";

const rule = parseIcsRecurrenceRule(ruleString);

const dates = extendByRecurrenceRule(rule, {
  start,
  end: addDays(start, 1),
});
```
