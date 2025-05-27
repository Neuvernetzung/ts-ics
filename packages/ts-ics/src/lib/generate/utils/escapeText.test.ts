import { escapeTextString } from "./escapeText";

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

    // Test remaining new lines
    expect(escapeTextString("text\nwith\nbreaks")).toBe("text\nwith\nbreaks");

    // Test that \n remains unchanged and \N is converted to \n
    expect(escapeTextString("text\\nwith\\Nbreaks")).toBe(
      "text\\nwith\\nbreaks"
    );

    // Test that colons are NOT escaped
    expect(escapeTextString("time:12:00")).toBe("time:12:00");
  });

  it("handles backslashes correctly", () => {
    // Normal backslashes should be escaped
    expect(escapeTextString("C:\\path\\file")).toBe("C:\\\\path\\\\file");

    // Backslashes before n should not be escaped, \N should be converted to \n
    expect(escapeTextString("text\\nmore\\Ntext\\other")).toBe(
      "text\\nmore\\ntext\\\\other"
    );
  });

  it("handles multiple special characters", () => {
    const input = "test,,;;\\\\text\\nmore";
    const expected = "test\\,\\,\\;\\;\\\\\\\\text\\nmore";
    expect(escapeTextString(input)).toBe(expected);
  });

  it("handles complex combinations", () => {
    const input = "Path\\to\\file,Description;with\\n\\Nand\\backslash";
    const expected =
      "Path\\\\to\\\\file\\,Description\\;with\\n\\nand\\\\backslash";
    expect(escapeTextString(input)).toBe(expected);
  });
});
