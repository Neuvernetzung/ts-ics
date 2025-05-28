import { icsTestData } from "../../../../tests/utils";
import { convertIcsEvent } from "../event";
import { unescapeTextString } from "./unescapeText";

describe("unescapeTextString", () => {
  it("unescapes basic special characters", () => {
    expect(unescapeTextString("Hello\\, World")).toBe("Hello, World");
    expect(unescapeTextString("Test\\; Text")).toBe("Test; Text");
    expect(unescapeTextString("Path\\\\to\\\\file")).toBe("Path\\to\\file");
    expect(unescapeTextString("Line 1\\nLine 2")).toBe("Line 1\nLine 2");
    expect(unescapeTextString("Line 1\\NLine 2")).toBe("Line 1\nLine 2");
  });

  it("handles multiple escaped characters", () => {
    expect(
      unescapeTextString(
        "Path\\, Name\\; Value\\\\Backslash\\NNewline\\nnewline"
      )
    ).toBe("Path, Name; Value\\Backslash\nNewline\nnewline");
  });

  it("handles complex combinations correctly", () => {
    const input = "Path\\\\to\\\\file\\, Description\\; Multiple\\nLines";
    const expected = "Path\\to\\file, Description; Multiple\nLines";
    expect(unescapeTextString(input)).toBe(expected);
  });
});

describe("Test in IcsEvent", () => {
  it("should unescape text - gh#183", () => {
    const calendar = icsTestData([
      "BEGIN:VEVENT",
      "UID:1",
      "DTSTART:20250522T173000Z",
      "DTEND:20250523T150000Z",
      "CREATED:20250520T114851Z",
      "DESCRIPTION:Start\\,-\\;-\\n-\\\\N-\\\\-\\n-\\\\n-\\\\\\\\End",
      "DTSTAMP:20250526T123957Z",
      "LAST-MODIFIED:20250526T123957Z",
      "SUMMARY:Summary",
      "END:VEVENT",
    ]);

    const icsEvent = convertIcsEvent(undefined, calendar);

    expect(icsEvent.description).toBe(`Start,-;-\n-\\N-\\-
-\\n-\\\\End`);
  });
});
