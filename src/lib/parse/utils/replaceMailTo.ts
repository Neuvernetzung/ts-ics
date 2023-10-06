export const replaceMailTo = (mailString: string) =>
  mailString.replace(/mailto:/gi, "");
