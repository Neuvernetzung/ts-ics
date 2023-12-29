---
sidebar_position: 1
---

# Getting Started

## Installation

`npm i ts-ics`

## Parsing

### Parse Ics Calendar

```ts
import { parseIcsCalendar, icsCalendarToObject, type VCalendar } from "ts-ics";

const calendarParsed: VCalendar = parseIcsCalendar(icsCalendarString);

// or if you only want to convert it, but not parse it

const calendar: VCalendar = icsCalendarToObject(icsCalendarString);
```

## Generating

### Generate Ics Calendar

```ts
import { generateIcsCalendar, type VCalendar } from "ts-ics";

const calendar: VCalendar = {...}

const icsCalendarString = generateIcsCalendar(calendar);
```
