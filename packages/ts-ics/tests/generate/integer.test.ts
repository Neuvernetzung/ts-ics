import { generateIcsInteger } from "@/lib";

it("Integer is generated correctly", () => {
  const integerString = generateIcsInteger("PERCENT-COMPLETE", 25);

  expect(integerString).toContain("PERCENT-COMPLETE:25\r\n");
});

it("Integer is stripping floating point correctly", () => {
  const integerString = generateIcsInteger("PERCENT-COMPLETE", 13.2);

  expect(integerString).toContain("PERCENT-COMPLETE:13\r\n");
});
