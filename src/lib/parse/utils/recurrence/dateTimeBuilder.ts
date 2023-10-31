import {
	getDate,
	getDaysInMonth,
	getDaysInYear,
	getHours,
	getMinutes,
	getMonth,
	getSeconds,
	getYear,
} from "date-fns";

export class DateTimeBuilder {
	public constructor(
		public year: number,
		public month: number,
		public day: number,
		public hours: number = 0,
		public minutes: number = 0,
		public seconds: number = 0
	) {}

	public static fromDate(date: Date): DateTimeBuilder {
		return new DateTimeBuilder(
			getYear(date),
			getMonth(date),
			getDate(date),
			getHours(date),
			getMinutes(date),
			getSeconds(date)
		);
	}

	public get date(): Date {
		this.normalize();
		return new Date(
			this.year,
			this.month,
			this.day,
			this.hours,
			this.minutes,
			this.seconds
		);
	}

	/**
	 * Makes sure that the fields are in the proper ranges (for example,
	 * converts 32 January to 1 February, and 25:00:00 to 1:00:00 of the next
	 * day).
	 */
	public normalize(): void {
		this.normalizeTime();
		this.normalizeDate();
	}

	/**
	 * Makes sure that the time fields are in the proper ranges (for example,
	 * converts 25:00:00 to 1:00:00 of the next day).
	 */
	private normalizeTime(): void {
		let addMinutes =
			(this.seconds < 0 ? this.seconds - 59 : this.seconds) / 60;
		this.seconds -= addMinutes * 60;
		this.minutes += addMinutes;
		let addHours =
			(this.minutes < 0 ? this.minutes - 59 : this.minutes) / 60;
		this.minutes -= addHours * 60;
		this.hours += addHours;
		let addDays = (this.hours < 0 ? this.hours - 23 : this.hours) / 24;
		this.hours -= addDays * 24;
		this.day += addDays;
	}

	/**
	 * Makes sure that the date fields are in the proper ranges (for example,
	 * converts 32 January to 1 February).
	 */
	private normalizeDate(): void {
		while (this.day <= 0) {
			let days = getDaysInYear(
				new Date(this.month > 2 ? this.year : this.year - 1, 1, 1)
			);
			this.day += days;
			--this.year;
		}

		if (this.month <= 0) {
			let years = this.month / 12 - 1;
			this.year += years;
			this.month -= 12 * years;
		} else if (this.month > 12) {
			let years = (this.month - 1) / 12;
			this.year += years;
			this.month -= 12 * years;
		}

		while (true) {
			if (this.month == 1) {
				let yearLength = getDaysInYear(new Date(this.year, 1, 1));
				if (this.day > yearLength) {
					++this.year;
					this.day -= yearLength;
				}
			}

			let monthLength = getDaysInMonth(
				new Date(this.year, this.month, 1)
			);
			if (this.day <= monthLength) {
				break;
			}

			this.day -= monthLength;
			if (++this.month > 12) {
				this.month -= 12;
				++this.year;
			}
		}
	}
}
