import { CRLF_BREAK } from "../../src/constants/symbols";

export const icsTestData = (icsDataRaw: string[]): string =>
  icsDataRaw.join(CRLF_BREAK); // Line breaks need to be CRLF, when creating a string inside Javascript its LF
