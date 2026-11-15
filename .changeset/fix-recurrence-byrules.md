---
"ts-ics": patch
---

Fix `extendByRecurrenceRule` for negative `BYMONTHDAY`, `BYMONTHDAY` on daily or shorter frequencies, `BYDAY` expansion on `MONTHLY`/`YEARLY` rules (keeps the `DTSTART` time of day, skips missing nth weekdays) and `BYSETPOS` indexing (gh#260).
