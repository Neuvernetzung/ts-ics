# @ts-ics/schema-zod

## 2.3.0

### Minor Changes

- 2d371ae: Fix typo in IcsWeekdayNumber.occurence #216

### Patch Changes

- Updated dependencies [2d371ae]
- Updated dependencies [e0eba50]
- Updated dependencies [3d5ed04]
- Updated dependencies [ba62b8a]
  - ts-ics@2.3.0

## 2.2.0

### Minor Changes

- f73149a: upgrade zod to version 4.0.1 and update schema definitions

### Patch Changes

- ts-ics@2.2.0

## 2.1.8

### Patch Changes

- Updated dependencies [2162874]
  - ts-ics@2.1.8

## 2.1.7

### Patch Changes

- Updated dependencies [6c2b1de]
  - ts-ics@2.1.7

## 2.1.6

### Patch Changes

- 69ffcb4: Add description ALTREP for event in zod schema
  - ts-ics@2.1.6

## 2.1.5

### Patch Changes

- Updated dependencies [4fd87b3]
  - ts-ics@2.1.5

## 2.1.4

### Patch Changes

- 7c9fab9: Add RSVP support to attendee schema and parsing logic and fix double generation of attendee role
- Updated dependencies [7c9fab9]
  - ts-ics@2.1.4

## 2.1.3

### Patch Changes

- 41a08e8: Add missing properties to zIcsCalendar schema (todos, journals, freeBusy)
  - ts-ics@2.1.3

## 2.1.2

### Patch Changes

- Updated dependencies [916e073]
  - ts-ics@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies [34f2592]
  - ts-ics@2.1.1

## 2.1.0

### Minor Changes

- 7dd6035: Add `VJOURNAL`
- 24eca58: Add `VTODO`
- a2cbe8c: Add `VFREEBUSY`

### Patch Changes

- Updated dependencies [7dd6035]
- Updated dependencies [24eca58]
- Updated dependencies [a2cbe8c]
  - ts-ics@2.1.0

## 2.0.5

### Patch Changes

- Updated dependencies [5d3b862]
  - ts-ics@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [327c1a1]
  - ts-ics@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [0a73bcb]
  - ts-ics@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [4473fd0]
- Updated dependencies [56a7c29]
  - ts-ics@2.0.2

## 2.0.0

### Major Changes

- 08ee37f: # Use standard schema in core library

  2.0 of ts-ics introduces standard-schema in core library and drops zod. Now you can bring in your own validation library or use one of the provided schema packages e.g. `@ts-ics/schema-zod`.

  Naming conventions have been restructured, e.g. type `VCalendar` has been renamed to `IcsCalendar` and `icsCalendarToObject` has been renamed to `convertIcsCalendar`.
  Parsing functions have been removed from the core library. These can now be imported from the schema libraries e.g. `import { parseIcsCalendar } from "@ts-ics/schema-zod"`.

### Minor Changes

- 0ac8dc8: Add support for non-standard properties #152

### Patch Changes

- 60501a4: Reduce bundle size by 2kb by inverting Ics object keys instead of hardcoding them.
- Updated dependencies [0ac8dc8]
- Updated dependencies [d101b4c]
- Updated dependencies [7643615]
- Updated dependencies [60501a4]
- Updated dependencies [08ee37f]
  - ts-ics@2.0.0
