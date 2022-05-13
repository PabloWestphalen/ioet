const {
	getEmployeeName,
	convertTimeStringToMinutes,
	getEmployeeWorkHours,
	calculateHourValue,
	calculateEmployeePayroll,
} = require("./payroll-calculator");

const inputString =
	"RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00";

test("Can parse input string to extract employee name", () => {
	expect(getEmployeeName(inputString)).toBe("RENE");
});

test("Can parse hh:mm string to extract number of minutes", () => {
	expect(convertTimeStringToMinutes("12:34")).toBe(754);
});

test("Can extract the complete data model from a correctly-formed input string", () => {
	expect(getEmployeeWorkHours(inputString)).toStrictEqual([
		{ day: "MO", start_time: 600, end_time: 720 },
		{ day: "TU", start_time: 600, end_time: 720 },
		{ day: "TH", start_time: 60, end_time: 180 },
		{ day: "SA", start_time: 840, end_time: 1080 },
		{ day: "SU", start_time: 1200, end_time: 1260 },
	]);
});

test("Can determine the amount to pay based on the day and time range specified", () => {
	expect(calculateHourValue("MO", 600, 720)).toBe(30);
});

test("Can correctly calculate the total to be paid to an employee based on their specified work hours", () => {
	const hours_worked = getEmployeeWorkHours(inputString);
	expect(calculateEmployeePayroll(hours_worked)).toBe(215);
});
