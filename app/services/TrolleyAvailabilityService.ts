import { CurrentDate } from "./DateService";

export function GetIsTrolleyAvailable(): boolean {
	const day = CurrentDate();
	const dayOfWeek = day.getDay() as DaysOfTheWeek;
	const hourOfDay = (day.getHours() + 23) % 24;
	const availabilityForDay = GetTrolleyAvailability()
		.filter((x) => x.day == dayOfWeek)
		.pop()!;

	return (
		(GetHourAsNumber(availabilityForDay.startTime) + 23) % 24 <= hourOfDay &&
		(GetHourAsNumber(availabilityForDay.endTime) + 23) % 24 > hourOfDay
	);
}

function GetHourAsNumber(time: TimeOfTheDay): number {
	switch (time) {
		case "10 AM":
			return 10;
		case "10 PM":
			return 22;
		case "12 AM (Midnight)":
			return 0;
		case "7 AM":
			return 7;
	}
}

export enum DaysOfTheWeek {
	Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
}

export type TimeOfTheDay = "7 AM" | "10 PM" | "12 AM (Midnight)" | "10 AM";

export type TrolleyHours = {
	day: DaysOfTheWeek;
	startTime: TimeOfTheDay;
	endTime: TimeOfTheDay;
};

export function GetTrolleyAvailability(): TrolleyHours[] {
	return [
		{
			day: DaysOfTheWeek.Monday,
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Tuesday,
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Wednesday,
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Thursday,
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Friday,
			startTime: "7 AM",
			endTime: "12 AM (Midnight)",
		},
		{
			day: DaysOfTheWeek.Saturday,
			startTime: "10 AM",
			endTime: "12 AM (Midnight)",
		},
		{
			day: DaysOfTheWeek.Sunday,
			startTime: "10 AM",
			endTime: "10 PM",
		},
	];
}
