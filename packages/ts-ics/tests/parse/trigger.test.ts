import { getLine } from "@/lib/parse/utils/line";

import { icsTriggerToObject } from "@/lib/parse/trigger";

it("Test Ics Trigger Parse", async () => {
  const trigger = `TRIGGER:-PT15M`;

  const { line } = getLine(trigger);

  expect(() => icsTriggerToObject(undefined, line)).not.toThrow();
});

it("Test Ics Trigger Parse", async () => {
  const trigger = `TRIGGER;RELATED=END:PT5M`;

  const { line } = getLine(trigger);

  expect(() => icsTriggerToObject(undefined, line)).not.toThrow();
});

it("Test Ics Trigger Parse", async () => {
  const trigger = `TRIGGER;VALUE=DATE-TIME:19980101T050000Z`;

  const { line } = getLine(trigger);

  expect(() => icsTriggerToObject(undefined, line)).not.toThrow();
});
