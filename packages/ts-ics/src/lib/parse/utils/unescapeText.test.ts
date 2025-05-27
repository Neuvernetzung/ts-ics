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
    expect(unescapeTextString("Path\\, Name\\; Value\\\\Backslash\\NNewline\\nnewline")).toBe(
      "Path, Name; Value\\Backslash\nNewline\nnewline"
    );
  });

  it("handles complex combinations correctly", () => {
    const input = "Path\\\\to\\\\file\\, Description\\; Multiple\\nLines";
    const expected = "Path\\to\\file, Description; Multiple\nLines";
    expect(unescapeTextString(input)).toBe(expected);
  });
});
