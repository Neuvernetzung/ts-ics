---
sidebar_position: 1
---

# parseIcsCalendar

## parse with zod

```ts
import { parseIcsCalendar, type VCalendar } from "ts-ics";

const calendarParsed: VCalendar = parseIcsCalendar(icsCalendarString);
```

## without zod parsing

```ts
import { icsCalendarToObject, type VCalendar } from "ts-ics";

const calendar: VCalendar = icsCalendarToObject(icsCalendarString);
```
