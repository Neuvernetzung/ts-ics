export const OBJECT_START = "BEGIN";
export const OBJECT_END = "END";

export const VCALENDAR_OBJECT_KEY = "VCALENDAR";
export const VTIMEZONE_OBJECT_KEY = "VTIMEZONE";
export const VTIMEZONE_STANDARD_OBJECT_KEY = "STANDARD";
export const VTIMEZONE_DAYLIGHT_OBJECT_KEY = "DAYLIGHT";
export const VEVENT_OBJECT_KEY = "VEVENT";
export const VALARM_OBJECT_KEY = "VALARM";
export const VTODO_OBJECT_KEY = "VTODO";
export const VJOURNAL_OBJECT_KEY = "VJOURNAL";
export const VFREEBUSY_OBJECT_KEY = "VFREEBUSY";

export type IcsComponents = typeof ICS_COMPONENTS;
export type IcsComponent = IcsComponents[number];

export const ICS_COMPONENTS = [
  VCALENDAR_OBJECT_KEY,
  VTIMEZONE_OBJECT_KEY,
  VTIMEZONE_STANDARD_OBJECT_KEY,
  VTIMEZONE_DAYLIGHT_OBJECT_KEY,
  VEVENT_OBJECT_KEY,
  VALARM_OBJECT_KEY,
  VTODO_OBJECT_KEY,
  VJOURNAL_OBJECT_KEY,
  VFREEBUSY_OBJECT_KEY,
] as const;

export * from "./calendar";
export * from "./alarm";
export * from "./event";
export * from "./timezone";
export * from "./timezoneProp";
export * from "./recurrenceRule";
export * from "./todo";
export * from "./journal";
export * from "./freebusy";
