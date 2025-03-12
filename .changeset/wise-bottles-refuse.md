---
"@ts-ics/schema-zod": major
"ts-ics": major
---

# Use standard schema in core library

2.0 of ts-ics introduces standard-schema in core library and drops zod. Now you can bring in your own validation library or use one of the provided schema packages e.g. `@ts-ics/schema-zod`.

Naming conventions have been restructured, e.g. type `VCalendar` has been renamed to `IcsCalendar` and `icsCalendarToObject` has been renamed to `convertIcsCalendar`.
Parsing functions have been removed from the core library. These can now be imported from the schema libraries e.g. `import { parseIcsCalendar } from "@ts-ics/schema-zod"`.
