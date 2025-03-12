export const VTIMEZONE_KEYS = ["TZID", "LAST-MODIFIED", "TZURL"] as const;
export type IcsTimezoneKeys = typeof VTIMEZONE_KEYS;
export type IcsTimezoneKey = IcsTimezoneKeys[number];

export const VTIMEZONE_OBJECT_KEYS = ["id", "lastModified", "url"] as const;

export type IcsTimezoneObjectKeys = typeof VTIMEZONE_OBJECT_KEYS;
export type IcsTimezoneObjectKey = IcsTimezoneObjectKeys[number];

export const VTIMEZONE_TO_OBJECT_KEYS: Record<
  IcsTimezoneKey,
  IcsTimezoneObjectKey
> = { "LAST-MODIFIED": "lastModified", TZID: "id", TZURL: "url" };

export const VTIMEZONE_TO_KEYS: Record<IcsTimezoneObjectKey, IcsTimezoneKey> = {
  id: "TZID",
  lastModified: "LAST-MODIFIED",
  url: "TZURL",
};
