import { VTimezone } from "@/types";
import { DatePredicate } from "./filter";
import { DateGenerator, skipSubDayGenerators } from "./generators";
import { DateTimeBuilder } from "./dateTimeBuilder";
import { DateRecurrenceIterator } from "./dateTimeUtils";

export const rRuleIterator = (
	dtStart: Date,
	tzid: string,
	condition: DatePredicate,
	instanceGenerator: DateGenerator,
	yearGenerator: DateGenerator,
	monthGenerator: DateGenerator,
	dayGenerator: DateGenerator,
	hourGenerator: DateGenerator,
	minuteGenerator: DateGenerator,
	secondGenerator: DateGenerator,
	canShortcutAdvance: boolean
): DateRecurrenceIterator => {
	let initWorkLimit = 1000;
	let done = false;
	let pendingUtc: Date | undefined = undefined;
	let lastUtc_ = new Date(1, 1, 1);

	/*
	 * Initialize the builder and skip over any extraneous start instances.
	 */
	let builder = DateTimeBuilder.fromDate(dtStart);

	const generateInstance = (): Date | undefined => {
		try {
			do {
				if (!instanceGenerator(builder)) {
					return undefined;
				}

				//const dUtc = dtStart instanceof TimeValue ? TimeUtils.toUtc(builder.toDateTime(), tzid) : builder.toDate();
				const dUtc = builder.date;
				if (dUtc > lastUtc_) {
					return dUtc;
				}
			} while (true);
		} catch (e) {
			return undefined;
		}
	};

	/*
	 * Apply the generators from largest field to smallest so we can start
	 * by applying the smallest field iterator when asked to generate a
	 * date.
	 */
	try {
		let toInitialize: DateGenerator[];
		if (
			skipSubDayGenerators(
				hourGenerator,
				minuteGenerator,
				secondGenerator
			)
		) {
			toInitialize = [yearGenerator, monthGenerator];
			builder.hours = hourGenerator.value!;
			builder.minutes = minuteGenerator.value!;
			builder.seconds = secondGenerator.value!;
		} else {
			toInitialize = [
				yearGenerator,
				monthGenerator,
				dayGenerator,
				hourGenerator,
				minuteGenerator,
			];
		}
		for (let i = 0; i != toInitialize.length; ) {
			if (toInitialize[i](builder)) {
				++i;
			} else {
				if (--i < 0) {
					//no years left
					done = true;
					break;
				}
			}

			if (--initWorkLimit == 0) {
				done = true;
				break;
			}
		}
	} catch (e) {
		done = true;
	}

	while (!done) {
		pendingUtc = generateInstance();
		if (pendingUtc == null) {
			done = true;
			break;
		}

		// if (pendingUtc.compareTo(TimeUtils.toUtc(dtStart, tzid)) >= 0) {
		if (pendingUtc >= dtStart) {
			/*
			 * We only apply the condition to the ones past dtStart to avoid
			 * counting useless instances.
			 */
			if (!condition(pendingUtc)) {
				done = true;
				pendingUtc = undefined;
			}
			break;
		}

		if (--initWorkLimit == 0) {
			done = true;
			break;
		}
	}

	const fetchNext = () => {
		if (pendingUtc != null || done) {
			return;
		}

		const dUtc = generateInstance();

		//check the exit condition
		if (dUtc == null || !condition(dUtc)) {
			done = true;
			return;
		}

		pendingUtc = dUtc;
		yearGenerator!.workDone!();
	};

	const hasNext = () => {
		if (pendingUtc == null) {
			fetchNext();
		}
		return pendingUtc != null;
	};

	const next = () => {
		if (pendingUtc == null) {
			fetchNext();
		}
		const next = pendingUtc;
		pendingUtc = undefined;
		return next;
	};

	return {
		next,
		hasNext,
	};
};
