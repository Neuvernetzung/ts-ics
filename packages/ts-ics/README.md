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
import { generateIcsCalendar, type IcsCalendar } from "ts-ics";

const calendar: IcsCalendar = {...}

const icsCalendarString = generateIcsCalendar(calendar);
```

### generateIcsEvent

```ts
import { generateIcsEvent, type IcsEvent } from "ts-ics";

const event: IcsEvent = {...}

const icsEventString = generateIcsEvent(event);
```

## parse

### parseIcsCalendar

#### parse with zod

```ts
import { parseIcsCalendar, type IcsCalendar } from "ts-ics";

const calendarParsed: IcsCalendar = parseIcsCalendar(icsCalendarString);
```

#### without zod parsing

```ts
import { convertIcsCalendar, type IcsCalendar } from "ts-ics";

const calendar: IcsCalendar = convertIcsCalendar(icsCalendarString);
```

### parseIcsEvent

#### parse with zod

```ts
import { parseIcsEvent, type IcsEvent } from "ts-ics";

const eventParsed: IcsEvent = parseIcsEvent(icsEventString);
```

#### without zod parsing

```ts
import { convertIcsEvent, type IcsEvent } from "ts-ics";

const event: IcsEvent = convertIcsEvent(icsEventString);
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
