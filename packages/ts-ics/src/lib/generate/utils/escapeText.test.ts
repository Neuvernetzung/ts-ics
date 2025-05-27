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

    // Test that \n and \N sequences remain unchanged
    expect(escapeTextString("text\\nwith\\Nbreaks")).toBe(
      "text\\nwith\\Nbreaks"
    );

    // Test that colons are NOT escaped
    expect(escapeTextString("time:12:00")).toBe("time:12:00");
  });

  it("handles backslashes correctly", () => {
    // Normal backslashes should be escaped
    expect(escapeTextString("C:\\path\\file")).toBe("C:\\\\path\\\\file");

    // Backslashes before n or N should not be escaped
    expect(escapeTextString("text\\nmore\\Ntext\\other")).toBe(
      "text\\nmore\\Ntext\\\\other"
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
      "Path\\\\to\\\\file\\,Description\\;with\\n\\Nand\\\\backslash";
    expect(escapeTextString(input)).toBe(expected);
  });
});
