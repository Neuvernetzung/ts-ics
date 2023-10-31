import {
	compareAsc,
	millisecondsToHours,
	millisecondsToMinutes,
} from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";

import { DateObjectTzProps, VTimezone, VTimezoneProp } from "@/types";
import {
	DateRecurrenceIterator,
	valuesDateRecurrenceIterator,
} from "../recurrence/dateTimeUtils";
import { createRecurrenceIterator } from "../recurrence/recurrence";
import { compoundIterator } from "../recurrence/compoundIterator";
import { UtcOffset, getOffsetMillis, parseOffset } from "./offset";

export const getTimezoneObjectOffset = (
	date: Date,
	tzid: string,
	timezones?: VTimezone[]
):
	| { offset: DateObjectTzProps["tzoffset"]; milliseconds: number }
	| undefined => {
	const vTimezone = timezones?.find((timezone) => timezone.id === tzid);
	if (vTimezone) {
		const utcOffset = getOffset(date, vTimezone);
		if (utcOffset) {
			const millies = getOffsetMillis(utcOffset);
			return {
				offset: `${!utcOffset.positive ? "-" : "+"}${
					utcOffset.hourOffset
				}${utcOffset.minuteOffset}`,
				milliseconds: millies,
			};
		}
	}

	// Prioritize IANA over VTIMEZONE Object, since we do not currently handle RRULE
	const ianaTimezone = getTimezoneOffset(tzid, date);

	if (!Number.isNaN(ianaTimezone)) {
		const isNegative = ianaTimezone < 0;
		const hours = Math.abs(millisecondsToHours(ianaTimezone));
		const minutes =
			Math.abs(millisecondsToMinutes(ianaTimezone)) - hours * 60;

		const pHours =
			hours.toString().length === 1 ? `0${hours}` : hours.toString();
		const pMinutes =
			minutes.toString().length === 1
				? `0${minutes}`
				: minutes.toString();

		return {
			offset: `${isNegative ? "-" : "+"}${pHours}${pMinutes}`,
			milliseconds: ianaTimezone,
		};
	}

	if (vTimezone) {
		const sortedProps = vTimezone.props.sort((a, b) =>
			compareAsc(a.start, b.start)
		);

		for (let i = 0; i < sortedProps.length; i += 1) {
			if (date < sortedProps[i].start) {
				const offset = sortedProps[i - 1]
					? sortedProps[i - 1].offsetTo
					: sortedProps[i].offsetFrom;

				return { offset, milliseconds: getTimezoneOffset(offset) };
			}
		}

		const icsOffset = sortedProps[sortedProps.length - 1].offsetTo;
		const offset =
			icsOffset.length > 5 ? icsOffset.substring(0, 5) : icsOffset;

		return { offset, milliseconds: getTimezoneOffset(offset) };
	}
};

const getSortedProps = (vTimezone: VTimezone): VTimezoneProp[] => {
	return vTimezone.props.sort((a, b) => compareAsc(a.start, b.start));
};

const getOffset = (date: Date, vTimezone: VTimezone): UtcOffset | undefined => {
	let closestIndex = -1;
	let closest: VTimezoneProp | undefined = undefined;
	let closestValue: Date | undefined = undefined;
	const sortedProps = getSortedProps(vTimezone);

	for (let i = 0; i < sortedProps.length; i++) {
		const observance = sortedProps[i];

		//skip observances that start after the given time
		const dtstart = observance.start;
		if (!!dtstart) {
			if (dtstart > date) {
				continue;
			}
		}

		const dateValue = getObservanceDateClosestToTheGivenDate(
			observance,
			date,
			false
		);
		if (
			dateValue != null &&
			(closestValue == null || closestValue < dateValue)
		) {
			closestValue = dateValue;
			closest = observance;
			closestIndex = i;
		}
	}

	const observanceIn = closest;
	const observanceInStart = closestValue;
	let observanceAfter: VTimezoneProp | undefined = undefined;
	let observanceAfterStart: Date | undefined = undefined;
	if (closestIndex < sortedProps.length - 1) {
		observanceAfter = sortedProps[closestIndex + 1];
		observanceAfterStart = getObservanceDateClosestToTheGivenDate(
			observanceAfter,
			date,
			true
		);
	}

	//const boundary = { observanceInStart, observanceIn, observanceAfterStart, observanceAfter };
	const offset = observanceIn?.offsetTo;
	if (!offset) return undefined;

	const parsedOffset = parseOffset(offset);
	return parsedOffset;
};

const getObservanceDateClosestToTheGivenDate = (
	observance: VTimezoneProp,
	date: Date,
	after: boolean
): Date | undefined => {
	let prev: Date | undefined = undefined;
	let cur: Date | undefined = undefined;
	let stopped = false;
	let it = createIterator(observance);
	while (it.hasNext()) {
		cur = it.next();

		if (date < cur!) {
			//stop if we have passed the givenTime
			stopped = true;
			break;
		}

		prev = cur;
	}
	return after ? (stopped ? cur : undefined) : prev;
};

function createIterator(observance: VTimezoneProp): DateRecurrenceIterator {
	const inclusions: DateRecurrenceIterator[] = [];

	const dtStart = observance.start;

	//add DTSTART property
	inclusions.push(valuesDateRecurrenceIterator([dtStart]));

	//add RRULE properties
	if (!!observance.recurrenceRule) {
		const iterator = createRecurrenceIterator(
			observance.recurrenceRule,
			observance.start,
			""
		);
		inclusions.push(iterator);
	}

	// TODO: add EXRULE properties
	// TODO: add RDATE properties
	// TODO: add EXDATE properties

	const joined = join(inclusions);
	return joined;
}

function join(iterators: DateRecurrenceIterator[]): DateRecurrenceIterator {
	if (iterators.length == 0) {
		return {
			hasNext: () => false,
			next: () => undefined,
		};
	}

	if (iterators.length == 1) {
		return iterators[0];
	}

	return compoundIterator(iterators, []);
}
