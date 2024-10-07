# TS-ICS

[![neuvernetzung-logo](https://raw.githubusercontent.com/Neuvernetzung/ts-ics/master/public/Header.png)](https://neuvernetzung.de)

[![NPM](https://nodei.co/npm/ts-ics.png)](https://nodei.co/npm/ts-ics/)

This package can parse and create Ics files and provides TypeScript types for easy handling.

## Motivation

Many of the Ics packages provide good functionality, however none of these are type safe. This package can parse Ics strings with Zod. Also, many packages are not actively maintained.

## Installation

`npm i ts-ics`

## generate

### generateIcsCalendar

```ts
import { generateIcsCalendar, type VCalendar } from "ts-ics";

const calendar: VCalendar = {...}

const icsCalendarString = generateIcsCalendar(calendar);
```

### generateIcsEvent

```ts
import { generateIcsEvent, type VEvent } from "ts-ics";

const event: VEvent = {...}

const icsEventString = generateIcsEvent(event);
```

## parse

### parseIcsCalendar

#### parse with zod

```ts
import { parseIcsCalendar, type VCalendar } from "ts-ics";

const calendarParsed: VCalendar = parseIcsCalendar(icsCalendarString);
```

#### without zod parsing

```ts
import { icsCalendarToObject, type VCalendar } from "ts-ics";

const calendar: VCalendar = icsCalendarToObject(icsCalendarString);
```

### parseIcsEvent

#### parse with zod

```ts
import { parseIcsEvent, type VEvent } from "ts-ics";

const eventParsed: VEvent = parseIcsEvent(icsEventString);
```

#### without zod parsing

```ts
import { icsEventToObject, type VEvent } from "ts-ics";

const event: VEvent = icsEventToObject(icsEventString);
```

## utils

### extendByRecurrenceRule

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

## License

MIT - [License](https://github.com/Neuvernetzung/ts-ics/blob/master/LICENSE)

## Thanks

Thanks to [iCalendar.org](https://icalendar.org/) for the ics documentation and the many examples which are used for testing purposes.
