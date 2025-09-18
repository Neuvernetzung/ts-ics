import type { IcsEvent } from "@/types";

import { escapeTextString } from "./escapeText";
import { generateIcsEvent } from "../components/event";

describe("escapeTextString", () => {
  it("escapes special characters according to RFC 5545", () => {
    // Test backslash escaping
    expect(escapeTextString("text\\with\\backslash")).toBe(
      "text\\\\with\\\\backslash"
    );

    // Test comma and semicolon escaping
    expect(escapeTextString("text,with;special,chars")).toBe(
      "text\\,with\\;special\\,chars"
    );

    // Test new lines escaping
    expect(escapeTextString("text\nwith\nbreaks")).toBe("text\\nwith\\nbreaks");

    // Test that raw \n and \N remains unchanged
    expect(escapeTextString("text\\nwithout\\Nbreaks")).toBe(
      "text\\\\nwithout\\\\Nbreaks"
    );

    // Test that colons are NOT escaped
    expect(escapeTextString("time:12:00")).toBe("time:12:00");
  });

  it("handles backslashes correctly", () => {
    // Normal backslashes should be escaped
    expect(escapeTextString("C:\\path\\file")).toBe("C:\\\\path\\\\file");

    // Backslashes before n should be escaped
    expect(escapeTextString("text\\nmore\\Ntext\\other")).toBe(
      "text\\\\nmore\\\\Ntext\\\\other"
    );
  });

  it("handles multiple special characters", () => {
    const input = "test,,;;\\\\text\\nmore\ntext";
    const expected = "test\\,\\,\\;\\;\\\\\\\\text\\\\nmore\\ntext";
    expect(escapeTextString(input)).toBe(expected);
  });

  it("handles complex combinations", () => {
    const input = "Path\\to\\file,Description;with\\n\\N\nnewline";
    const expected =
      "Path\\\\to\\\\file\\,Description\\;with\\\\n\\\\N\\nnewline";
    expect(escapeTextString(input)).toBe(expected);
  });
});

describe("Test in IcsEvent", () => {
  const date = new Date("2021-01-01");

  it("should escape text - gh#183", () => {
    const event: IcsEvent = {
      description: `Start,-;-\n-\\N-\\-
-\\n-\\\\End`,
      summary: "Summary",
      start: {
        date,
      },
      end: {
        date,
      },
      stamp: {
        date,
      },
      uid: "123",
    };
    const icsCalendar = generateIcsEvent(event);

    expect(icsCalendar).toContain(
      "DESCRIPTION:Start\\,-\\;-\\n-\\\\N-\\\\-\\n-\\\\n-\\\\\\\\End"
    );
  });
});
