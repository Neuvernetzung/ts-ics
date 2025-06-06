# ts-ics

## 2.1.7

### Patch Changes

- 6c2b1de: Fix empty generation of duration #206

## 2.1.6

## 2.1.5

### Patch Changes

- 4fd87b3: Description AltRep support for Event #197

## 2.1.4

### Patch Changes

- 7c9fab9: Add RSVP support to attendee schema and parsing logic and fix double generation of attendee role

## 2.1.3

## 2.1.2

### Patch Changes

- 916e073: Update text escaping to strictly follow RFC 5545

## 2.1.1

### Patch Changes

- 34f2592: Fix: Correct handling of escaped newlines (\\n) in ICS files. Previously, escaped newlines were incorrectly processed during line folding, now they are preserved correctly in the output.

## 2.1.0

### Minor Changes

- 7dd6035: Add `VJOURNAL`
- 24eca58: Add `VTODO`
- a2cbe8c: Add `VFREEBUSY`

## 2.0.5

### Patch Changes

- 5d3b862: Fix missing SEQUENCE key #174

## 2.0.4

### Patch Changes

- 327c1a1: Propagate non standard values to child components

## 2.0.3

### Patch Changes

- 0a73bcb: Strip Z from timezone and apply offset to local timezone generation #166

## 2.0.2

### Patch Changes

- 4473fd0: Include date-fns in bundle to prevent peer-dependency conflicts
- 56a7c29: Add tests to generate event end from duration

## 2.0.1

### Patch Changes

- 2488a4d: Correctly handle RECURRENCE-ID #159

## 2.0.0

### Major Changes

- 08ee37f: # Use standard schema in core library

  2.0 of ts-ics introduces standard-schema in core library and drops zod. Now you can bring in your own validation library or use one of the provided schema packages e.g. `@ts-ics/schema-zod`.

  Naming conventions have been restructured, e.g. type `VCalendar` has been renamed to `IcsCalendar` and `icsCalendarToObject` has been renamed to `convertIcsCalendar`.
  Parsing functions have been removed from the core library. These can now be imported from the schema libraries e.g. `import { parseIcsCalendar } from "@ts-ics/schema-zod"`.

### Minor Changes

- 0ac8dc8: Add support for non-standard properties #152
- d101b4c: Remove lodash as peer dependency #145

### Patch Changes

- 7643615: Add test for recurrenceId #140
- 60501a4: Reduce bundle size by 2kb by inverting Ics object keys instead of hardcoding them.

## 1.6.8

### Patch Changes

- 4666c8d: parse recurrenceId when parsing event #153

## 1.6.7

### Patch Changes

- 9340426: Dont fold lines twice on generateCalendar #141

## 1.6.6

### Patch Changes

- eafde97: add support for X-WR-CALNAME
- 4071e2f: Escape commas and semicolons in value type of TEXT #134

## 1.6.5

### Patch Changes

- 9f05bb4: If Version is last key of Calendar Object, leftover line breaks break validation #130

## 1.6.4

### Patch Changes

- 52f4f6a: IcsRecurrenceRule Until - Correctly parse date value #123
- f531823: Dont throw on apple values #126

## 1.6.3

### Patch Changes

- eaa370e: Correctly handle VALUE=DATE in timeStamp #120

## 1.6.2

### Patch Changes

- 36343d5: Fix `until` creation inside rrule and remove `undefined` if until.local is unset #117

## 1.6.1

### Patch Changes

- 6581389: Handle LF file imports but also support LF line breaks inside DESCRIPTION string #115

## 1.6.0

### Minor Changes

- cf2565b: Correcly handle LF line breaks inside values #111

## 1.5.0

### Minor Changes

- 7fe6d53: Update date-fns to v4 #108

## 1.4.2

### Patch Changes

- 03c40c7: Custom time zone name make parsing ics calendar fails #104

## 1.4.1

### Patch Changes

- a290080: Update README and Deps #101

## 1.4.0

### Minor Changes

- 498943b: Add EXDATE to recurrenceRule and generate/parse #96

## 1.3.4

### Patch Changes

- 91783fa: Replace eslint with biome #89
- 57704e7: Update readme #91

## 1.3.3

### Patch Changes

- c81d494: Bump express from 4.18.2 to 4.19.2 #87
- bd3cd05: Bump webpack-dev-middleware from 5.3.3 to 5.3.4 #86

## 1.3.2

### Patch Changes

- 544e6ee: follow-redirects update #83

## 1.3.1

### Patch Changes

- 6a59628: defaultLocale zu getOffsetFromTimezoneId hinzufügen für Beständigkeit #79

## 1.3.0

### Minor Changes

- c8afddc: date-fns zu v3 updaten #65

### Patch Changes

- 27026ae: date-fns-tz entfernen und durch eigene Funktion ersetzen #64
- 3c4b8cc: public und tests zu .npmignore hinzufügen #70
- 9727efb: Struktur zu Monorepo ändern #73
- 9955f53: Docs hinzufügen #66
- 3d24db7: Github Actions updaten #68
