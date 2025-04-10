# @ts-ics/schema-zod

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
