---
"ts-ics": patch
---

Apply `COUNT` in `extendByRecurrenceRule` after the `BY*` rules have expanded and filtered each period, so filtering rules such as `FREQ=DAILY;BYDAY=TU;COUNT=3` return the requested number of occurrences. Exceptions (`EXDATE`) are now removed after `COUNT` for every frequency, as RFC 5545 specifies (gh#260).
