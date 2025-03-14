# TS-ICS

[![neuvernetzung-logo](https://raw.githubusercontent.com/Neuvernetzung/ts-ics/master/public/Header.png)](https://neuvernetzung.de/?utm_source=github&utm_campaign=ts-ics&utm_id=ts-ics)

[![NPM](https://nodei.co/npm/ts-ics.png)](https://nodei.co/npm/ts-ics/)

This library can parse and create Ics files and provides TypeScript types for easy handling and aims to be fully [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) compliant.

## Motivation

Many of the Ics libraries provide good functionality, but none of them are type safe. This library can parse Ics strings with any validator, thanks to [Standard-Schema](https://github.com/standard-schema/standard-schema).

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

### generate non standard values

Non-standard values must be prefixed with `X-`. Unhandled non-standard values are automatically prefixed and converted to upper case, and the value is converted to a string.

```ts
type NonStandard = { isCustomer: string }

const calendar: IcsCalendar<NonStandard> = {
  nonStandard: { isCustomer: "yeah" },
  ...
};

const calendarString = generateIcsCalendar<NonStandard>(calendar, {
  nonStandard: {
    isCustomer: { name: "X-IS-CUSTOMER", generate: (v) => ({ value: v }) },
  },
});
```

## parse

### IcsCalendar

#### without parsing

```ts
import { convertIcsCalendar, type IcsCalendar } from "ts-ics";

const calendar: IcsCalendar = convertIcsCalendar(undefined, icsCalendarString);
```

#### parse with zod

```ts
import { type IcsCalendar } from "ts-ics";
import { parseIcsCalendar } from "@ts-ics/schema-zod";

const calendarParsed: IcsCalendar = parseIcsCalendar(icsCalendarString);
```

#### provide your own validator

This library uses [Standard-Schema](https://github.com/standard-schema/standard-schema) under the hood, so every schema library that implements the spec can be used.

```ts
import { convertIcsCalendar, type IcsCalendar } from "ts-ics";
import { zIcsCalendar } from "@ts-ics/schema-zod";

const calendar: IcsCalendar = convertIcsCalendar(
  zIcsCalendar,
  icsCalendarString
);
```

### IcsEvent

#### without parsing

```ts
import { convertIcsEvent, type IcsEvent } from "ts-ics";

const event: IcsEvent = convertIcsEvent(undefined, icsEventString);
```

#### parse with zod

```ts
import { type IcsEvent } from "ts-ics";
import { parseIcsEvent } from "@ts-ics/schema-zod";

const eventParsed: IcsEvent = parseIcsEvent(icsEventString);
```

#### provide your own validator

This library uses [Standard-Schema](https://github.com/standard-schema/standard-schema) under the hood, so every schema library that implements the spec can be used.

```ts
import { convertIcsEvent, type IcsEvent } from "ts-ics";
import { zIcsEvent } from "@ts-ics/schema-zod";

const calendar: IcsEvent = convertIcsEvent(zIcsEvent, icsEventString);
```

### parse non standard values

Non-standard values must be prefixed with `X-`. Unhandled non-standard values are automatically un-prefixed and converted to camel case, and the value is converted to a string.

```ts
const calendarString = `...
  X-IS-CUSTOMER:yeah
  ...`;

const calendar = convertIcsCalendar(undefined, calendarString, {
  nonStandard: {
    isCustomer: {
      name: "X-IS-CUSTOMER",
      convert: (line) => line.value,
      schema: z.string(), // optionally provide any validator
    },
  },
});
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
