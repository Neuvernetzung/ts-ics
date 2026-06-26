import { convertIcsDuration } from "@/lib/parse/values/duration";

it("Test Ics IcsDuration Parse", async () => {
	const value = "P15DT5H0M20S";

	expect(() => convertIcsDuration(undefined, { value })).not.toThrow();
});

it("Test Ics IcsDuration Parse", async () => {
	const value = "P7W";

	expect(() => convertIcsDuration(undefined, { value })).not.toThrow();
});

it("Test Ics IcsDuration Parse - gh#250", async () => {
	const durationString = "P0W0DT1H0M0S";

	const parsedDuration = convertIcsDuration(undefined, {
		value: durationString,
	});

	expect(parsedDuration.weeks).toBe(0);
	expect(parsedDuration.days).toBe(0);
	expect(parsedDuration.days).not.toBe(NaN);
});
