describe("GetIsTrolleyAvailable returns correct availability based on current time", () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});
	function run(inputDate: Date, expectedReturn: boolean) {
		it(`${inputDate} should return ${expectedReturn}`, () => {
			const dateService = require("../DateService");
			const trolleyAvailabilityService = require("../TrolleyAvailabilityService");
			jest.spyOn(dateService, "CurrentDate").mockReturnValue(inputDate);
			expect(trolleyAvailabilityService.GetIsTrolleyAvailable()).toBe(
				expectedReturn
			);
		});
	}

	run(new Date("Sun Sep 05 2021 21:08:54 GMT-0500"), true);
	run(new Date("Sun Sep 05 2021 10:08:54 GMT-0500"), true);
	run(new Date("Sun Sep 05 2021 22:08:54 GMT-0500"), false);
	run(new Date("Sun Sep 05 2021 23:08:54 GMT-0500"), false);
	run(new Date("Sun Sep 05 2021 04:08:54 GMT-0500"), false);

	run(new Date("Mon Sep 06 2021 22:08:54 GMT-0500"), false);
	run(new Date("Mon Sep 06 2021 21:08:54 GMT-0500"), true);
	run(new Date("Mon Sep 06 2021 04:08:54 GMT-0500"), false);

	run(new Date("Fri Sep 03 2021 22:08:54 GMT-0500"), true);
	run(new Date("Fri Sep 03 2021 21:08:54 GMT-0500"), true);
	run(new Date("Fri Sep 03 2021 01:08:54 GMT-0500"), false);

	run(new Date("Fri Sep 03 2021 00:08:54 GMT-0500"), false);
	run(new Date("Fri Sep 03 2021 23:08:54 GMT-0500"), true);
	run(new Date("Fri Sep 03 2021 23:59:54 GMT-0500"), true);
	run(new Date("Fri Sep 03 2021 04:08:54 GMT-0500"), false);
});
