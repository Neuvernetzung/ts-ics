import type { IcsTimezoneProp } from "@/types";

import { extendByRecurrenceRule } from "../recurrence";

export const extendTimezoneProps = (
	date: Date,
	timezoneProps: IcsTimezoneProp[],
): IcsTimezoneProp[] =>
	timezoneProps.flatMap((timezoneProp) => {
		if (timezoneProp.recurrenceRule) {
			const extended = extendByRecurrenceRule(timezoneProp.recurrenceRule, {
				start: timezoneProp.start,
				end: date,
			}).map((date) => ({ ...timezoneProp, start: date }));

			return extended;
		}

		if (timezoneProp.recurrenceDate) {
			return [
				timezoneProp,
				{ ...timezoneProp, start: timezoneProp.recurrenceDate.date },
			];
		}

		return timezoneProp;
	});
