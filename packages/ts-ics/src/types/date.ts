export const dateObjectTypes = ["DATE", "DATE-TIME"] as const;

export type DateObjectTypes = typeof dateObjectTypes;
export type DateObjectType = DateObjectTypes[number];

export type DateObjectTzProps = {
  date: Date;
  timezone: string;
  tzoffset: string;
};

export type DateObject = {
  date: Date;
  type?: DateObjectType;
  local?: DateObjectTzProps;
};
