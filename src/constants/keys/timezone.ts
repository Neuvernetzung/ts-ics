export const VTIMEZONE_KEYS = ["TZID", "LAST-MODIFIED", "TZURL"] as const;
export type VTimezoneKeys = typeof VTIMEZONE_KEYS;
export type VTimezoneKey = VTimezoneKeys[number];

export const VTIMEZONE_OBJECT_KEYS = ["id", "lastModified", "url"] as const;

export type VTimezoneObjectKeys = typeof VTIMEZONE_OBJECT_KEYS;
export type VTimezoneObjectKey = VTimezoneObjectKeys[number];

export const VTIMEZONE_TO_OBJECT_KEYS: Record<
  VTimezoneKey,
  VTimezoneObjectKey
> = { "LAST-MODIFIED": "lastModified", TZID: "id", TZURL: "url" };

export const VTIMEZONE_TO_KEYS: Record<VTimezoneObjectKey, VTimezoneKey> = {
  id: "TZID",
  lastModified: "LAST-MODIFIED",
  url: "TZURL",
};
