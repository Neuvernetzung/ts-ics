// https://icalendar.org/iCalendar-RFC-5545/3-3-11-text.html
// According to RFC 5545:
// ESCAPED-CHAR = ("\\" / "\;" / "\," / "\N" / "\n")
//    ; \\ encodes \, \N or \n encodes newline
//    ; \; encodes ;, \, encodes ,
//    ; Note: A COLON character in a TEXT property value SHALL NOT be escaped
export const escapeTextString = (inputString: string) => {
  return inputString
    .replace(/\\/g, "\\\\") // First escape all backslashes
    .replace(/([,;])/g, "\\$1") // Then escape commas and semicolons
    .replace(/\\\\([nN])/g, "\\$1") // Fix double-escaped \n and \N
    .replace(/\\N/g, "\\n"); // Replace \N with \n
};
