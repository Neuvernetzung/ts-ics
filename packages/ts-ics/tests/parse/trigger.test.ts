import { getLine } from "@/lib/parse/utils/line";

import { convertIcsTrigger } from "@/lib/parse/values/trigger";

it("Test Ics IcsTrigger Parse", async () => {
  const trigger = `TRIGGER:-PT15M`;

  const { line } = getLine(trigger);

  expect(() => convertIcsTrigger(undefined, line)).not.toThrow();
});

it("Test Ics IcsTrigger Parse", async () => {
  const trigger = `TRIGGER;RELATED=END:PT5M`;

  const { line } = getLine(trigger);

  expect(() => convertIcsTrigger(undefined, line)).not.toThrow();
});

it("Test Ics IcsTrigger Parse", async () => {
  const trigger = `TRIGGER;VALUE=DATE-TIME:19980101T050000Z`;

  const { line } = getLine(trigger);

  expect(() => convertIcsTrigger(undefined, line)).not.toThrow();
});
