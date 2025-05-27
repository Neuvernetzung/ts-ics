import { unescapeTextString } from "./unescapeText";

describe("unescapeTextString", () => {
  it("unescapes basic special characters", () => {
    expect(unescapeTextString("Hello\\, World")).toBe("Hello, World");
    expect(unescapeTextString("Test; Text")).toBe("Test; Text");
    expect(unescapeTextString("Path\\\\to\\\\file")).toBe("Path\\to\\file");
  });

  it("handles multiple escaped characters", () => {
    expect(unescapeTextString("Path, Name; Value\\\\Backslash")).toBe(
      "Path, Name; Value\\Backslash"
    );
  });

  it("should not modify \n or N sequences", () => {
    expect(unescapeTextString("Line\nBreak")).toBe("Line\nBreak");
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    expect(unescapeTextString(`Line\NBreak`)).toBe(`Line\NBreak`);
  });

  it("handles complex combinations correctly", () => {
    const input = "Path\\\\to\\\\file\\, Description\\; Multiple\nLines";
    const expected = "Path\\to\\file, Description; Multiple\nLines";
    expect(unescapeTextString(input)).toBe(expected);
  });
});
