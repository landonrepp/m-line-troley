import { CurrentDate } from "./DateService";

export function GetIsTrolleyAvailable(): boolean {
	const day = CurrentDate();
	const dayOfWeek = day.getDay() as DaysOfTheWeek;
	// +23 %24 maps everything normally, except midnight, 
  	// which will not be considered the last hour of the day
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
	SundayOrHoliday,
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
	nameOfDay: string;
	startTime: TimeOfTheDay;
	endTime: TimeOfTheDay;
};

export function GetTrolleyAvailability(): TrolleyHours[] {
	return [
		{
			day: DaysOfTheWeek.Monday,
			nameOfDay: "Mondays",
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Tuesday,
			nameOfDay: "Tuesdays",
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Wednesday,
			nameOfDay: "Wednesdays",
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Thursday,
			nameOfDay: "Thursdays",
			startTime: "7 AM",
			endTime: "10 PM",
		},
		{
			day: DaysOfTheWeek.Friday,
			nameOfDay: "Fridays",
			startTime: "7 AM",
			endTime: "12 AM (Midnight)",
		},
		{
			day: DaysOfTheWeek.Saturday,
			nameOfDay: "Saturdays",
			startTime: "10 AM",
			endTime: "12 AM (Midnight)",
		},
		{
			day: DaysOfTheWeek.SundayOrHoliday,
			nameOfDay: "Sundays or Holidays",
			startTime: "10 AM",
			endTime: "10 PM",
		},
	];
}
