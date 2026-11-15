import {
	eachDayOfInterval,
	endOfMonth,
	endOfYear,
	getDay,
	getHours,
	getMilliseconds,
	getMinutes,
	getSeconds,
	set,
	setDay,
	startOfMonth,
	startOfYear,
} from "date-fns";

import { type IcsRecurrenceRule, type WeekDayNumber, weekDays } from "@/types";

export const iterateByDay = (
	rule: IcsRecurrenceRule,
	dateGroups: Date[][],
	byDay: NonNullable<IcsRecurrenceRule["byDay"]>,
	weekStartsOn: WeekDayNumber,
): Date[][] => {
	const dayIndeces = byDay.map(({ day, occurrence }) => ({
		occurrence,
		day: weekDays.indexOf(day),
	}));

	if (rule.frequency === "YEARLY") {
		if (rule.byYearday || rule.byMonthday) {
			return dateGroups.map((dates) =>
				dates.filter((date) =>
					dayIndeces.find(({ day }) => day === getDay(date)),
				),
			);
		}

		if (rule.byWeekNo) {
			return dateGroups.map((dates) =>
				dates.flatMap((date) =>
					dayIndeces.map(({ day }) => setDay(date, day, { weekStartsOn })),
				),
			);
		}

		if (rule.byMonth) {
			return dateGroups.map((dates) =>
				dates.flatMap((date) =>
					dayIndeces.flatMap(({ day, occurrence }) =>
						expandByOccurence(
							date,
							startOfMonth(date),
							endOfMonth(date),
							day,
							occurrence,
						),
					),
				),
			);
		}

		return dateGroups.map((dates) =>
			dates.flatMap((date) =>
				dayIndeces.flatMap(({ day, occurrence }) =>
					expandByOccurence(
						date,
						startOfYear(date),
						endOfYear(date),
						day,
						occurrence,
					),
				),
			),
		);
	}

	if (rule.frequency === "MONTHLY") {
		if (rule.byMonthday) {
			return dateGroups.map((dates) =>
				dates.filter((date) =>
					dayIndeces.find(({ day }) => day === getDay(date)),
				),
			);
		}

		return dateGroups.map((dates) =>
			dates.flatMap((date) =>
				dayIndeces.flatMap(({ day, occurrence }) =>
					expandByOccurence(
						date,
						startOfMonth(date),
						endOfMonth(date),
						day,
						occurrence,
					),
				),
			),
		);
	}

	if (rule.frequency === "WEEKLY") {
		return dateGroups.map((dates) =>
			dates.flatMap((date) =>
				dayIndeces.map(({ day }) => setDay(date, day, { weekStartsOn })),
			),
		);
	}

	return dateGroups.map((dates) =>
		dates.filter((date) => dayIndeces.find(({ day }) => day === getDay(date))),
	);
};

// Liefert alle passenden Wochentage im Zeitraum bzw. bei gesetzter occurrence nur den n-ten (negativ: vom Ende her). Die Uhrzeit wird von `date` übernommen.
const expandByOccurence = (
	date: Date,
	start: Date,
	end: Date,
	day: number,
	occurrence?: number,
): Date[] => {
	const days = eachDayOfInterval({ start, end })
		.filter((d) => getDay(d) === day)
		.map((d) => withTimeOf(d, date));

	if (!occurrence) return days;

	const nthDay = days.at(occurrence > 0 ? occurrence - 1 : occurrence);

	return nthDay ? [nthDay] : [];
};

const withTimeOf = (day: Date, time: Date) =>
	set(day, {
		hours: getHours(time),
		minutes: getMinutes(time),
		seconds: getSeconds(time),
		milliseconds: getMilliseconds(time),
	});
