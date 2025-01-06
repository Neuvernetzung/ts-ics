export const VCALENDAR_KEYS = ["VERSION", "METHOD", "PRODID", "X-WR-CALNAME"] as const;
export type VCalendarKeys = typeof VCALENDAR_KEYS;
export type VCalendarKey = VCalendarKeys[number];

export const VCALENDAR_OBJECT_KEYS = ["version", "method", "prodId", "calname"] as const;

export type VCalendarObjectKeys = typeof VCALENDAR_OBJECT_KEYS;
export type VCalendarObjectKey = VCalendarObjectKeys[number];

export const VCALENDAR_TO_OBJECT_KEYS: Record<VCalendarKey, VCalendarObjectKey> = {
	METHOD: "method",
	PRODID: "prodId",
	VERSION: "version",
	"X-WR-CALNAME": "calname",
};

export const VCALENDAR_TO_KEYS: Record<VCalendarObjectKey, VCalendarKey> = {
	method: "METHOD",
	prodId: "PRODID",
	version: "VERSION",
	calname: "X-WR-CALNAME",
};
