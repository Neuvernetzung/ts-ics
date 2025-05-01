import {
  OBJECT_END,
  OBJECT_START,
  VALARM_OBJECT_KEY,
  VCALENDAR_OBJECT_KEY,
  VEVENT_OBJECT_KEY,
  VTIMEZONE_DAYLIGHT_OBJECT_KEY,
  VTIMEZONE_OBJECT_KEY,
  VTIMEZONE_STANDARD_OBJECT_KEY,
  VTODO_OBJECT_KEY,
} from "../keys";

const createGetRegex = (key: string) =>
  new RegExp(`${OBJECT_START}:${key}([\\s\\S]*?)${OBJECT_END}:${key}`, "g");

export const getTimezoneRegex = createGetRegex(VTIMEZONE_OBJECT_KEY);

export const getTimezoneStandardRegex = createGetRegex(
  VTIMEZONE_STANDARD_OBJECT_KEY
);
export const getTimezoneDaylightRegex = createGetRegex(
  VTIMEZONE_DAYLIGHT_OBJECT_KEY
);

export const getEventRegex = createGetRegex(VEVENT_OBJECT_KEY);

export const getAlarmRegex = createGetRegex(VALARM_OBJECT_KEY);

export const getTodoRegex = createGetRegex(VTODO_OBJECT_KEY);

const createReplaceRegex = (key: string) =>
  new RegExp(`${OBJECT_START}:${key}|${OBJECT_END}:${key}`, "g");

export const replaceCalendarRegex = createReplaceRegex(VCALENDAR_OBJECT_KEY);

export const replaceTimezoneRegex = createReplaceRegex(VTIMEZONE_OBJECT_KEY);

export const replaceTimezoneStandardRegex = createReplaceRegex(
  VTIMEZONE_STANDARD_OBJECT_KEY
);
export const replaceTimezoneDaylightRegex = createReplaceRegex(
  VTIMEZONE_DAYLIGHT_OBJECT_KEY
);

export const replaceEventRegex = createReplaceRegex(VEVENT_OBJECT_KEY);

export const replaceAlarmRegex = createReplaceRegex(VALARM_OBJECT_KEY);

export const replaceTodoRegex = createReplaceRegex(VTODO_OBJECT_KEY);
