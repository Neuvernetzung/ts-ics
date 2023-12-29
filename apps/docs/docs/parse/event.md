---
sidebar_position: 2
---

# parseIcsEvent

## parse with zod

```ts
import { parseIcsEvent, type VEvent } from "ts-ics";

const eventParsed: VEvent = parseIcsEvent(icsEventString);
```

## without zod parsing

```ts
import { icsEventToObject, type VEvent } from "ts-ics";

const event: VEvent = icsEventToObject(icsEventString);
```
