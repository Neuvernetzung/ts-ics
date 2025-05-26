---
"ts-ics": patch
---

Fix: Correct handling of escaped newlines (\\n) in ICS files. Previously, escaped newlines were incorrectly processed during line folding, now they are preserved correctly in the output.
