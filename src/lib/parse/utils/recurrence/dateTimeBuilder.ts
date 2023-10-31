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
  public year: number;

  public month: number;

  public day: number;

  public hours: number = 0;

  public minutes: number = 0;

  public seconds: number = 0;

  // eslint-disable-next-line no-useless-constructor
  public constructor(
    year: number,
    month: number,
    day: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
  ) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  public static fromDate(date: Date): DateTimeBuilder {
    return new DateTimeBuilder(
      getYear(date),
      getMonth(date),
      getDate(date),
      getHours(date),
      getMinutes(date),
      getSeconds(date),
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
      this.seconds,
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
    const addMinutes =
      (this.seconds < 0 ? this.seconds - 59 : this.seconds) / 60;
    this.seconds -= addMinutes * 60;
    this.minutes += addMinutes;
    const addHours = (this.minutes < 0 ? this.minutes - 59 : this.minutes) / 60;
    this.minutes -= addHours * 60;
    this.hours += addHours;
    const addDays = (this.hours < 0 ? this.hours - 23 : this.hours) / 24;
    this.hours -= addDays * 24;
    this.day += addDays;
  }

  /**
   * Makes sure that the date fields are in the proper ranges (for example,
   * converts 32 January to 1 February).
   */
  private normalizeDate(): void {
    while (this.day <= 0) {
      const days = getDaysInYear(
        new Date(this.month > 2 ? this.year : this.year - 1, 1, 1),
      );
      this.day += days;
      this.year -= 1;
    }

    if (this.month <= 0) {
      const years = this.month / 12 - 1;
      this.year += years;
      this.month -= 12 * years;
    } else if (this.month > 12) {
      const years = (this.month - 1) / 12;
      this.year += years;
      this.month -= 12 * years;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.month === 1) {
        const yearLength = getDaysInYear(new Date(this.year, 1, 1));
        if (this.day > yearLength) {
          this.year += 1;
          this.day -= yearLength;
        }
      }

      const monthLength = getDaysInMonth(new Date(this.year, this.month, 1));
      if (this.day <= monthLength) {
        break;
      }

      this.day -= monthLength;
      this.month += 1;
      if (this.month > 12) {
        this.month -= 12;
        this.year += 1;
      }
    }
  }
}
