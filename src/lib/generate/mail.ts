export const generateIcsMail = (email: string, isOption?: boolean) =>
  isOption ? `"MAILTO:${email}"` : `MAILTO:${email}`;
