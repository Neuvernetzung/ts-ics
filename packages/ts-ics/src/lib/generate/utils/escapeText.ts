// https://icalendar.org/iCalendar-RFC-5545/3-3-11-text.html
// According to RFC 5545:
// ESCAPED-CHAR = ("\\" / "\;" / "\," / "\N" / "\n")
//    ; \\ encodes \, \N or \n encodes newline
//    ; \; encodes ;, \, encodes ,
//    ; Note: A COLON character in a TEXT property value SHALL NOT be escaped
export const escapeTextString = (inputString: string) => {
  return inputString.replace(/\\(?![nN])/g, "\\\\").replace(/([,;])/g, "\\$1");
};
