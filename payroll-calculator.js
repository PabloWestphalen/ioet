const fs = require("fs").promises;

/**
 *
 * @param {String} inputString
 * @returns {String} The employee name
 */
const getEmployeeName = (inputString) => {
	const match = inputString.match(/^([a-zA-Z]+)=/);
	if (!match) {
		throw new Error("Could not parse input string.");
	}
	return match[1];
};

/**
 *
 * @param {String} timeString A timestring in hh:mm format
 * @returns {int} An integer representing the number of minutes since midnight (0) of the provided timeString
 */
const convertTimeStringToMinutes = (timeString) => {
	const timeComponents = timeString.split(":");

	if (!timeComponents?.length === 2) {
		throw new Error("Could not parse timeString", timeString);
	}

	return timeComponents.reduce((minutes, timeComponent, index) => {
		if (index === 0) {
			return (minutes += parseInt(timeComponent) * 60);
		} else {
			return (minutes += parseInt(timeComponent));
		}
	}, 0);
};

/**
 *
 * @param {String} inputString
 * @returns {Array} An array of hours-worked objects. Example: [{day: 'MO', start_time: 600, end_time: 720}]
 */
const getEmployeeWorkHours = (inputString) => {
	const work_days = inputString.match(/\w+=(.*)/)[1]?.split(",");
	if (!work_days) {
		throw new Error("Could not parse input string.");
	}
	return work_days.map((day) => {
		const data = day.match(/(\w{2})(\d{2}:\d{2})-(\d{2}:\d{2})/);
		if (!data) {
			throw new Error("Could not parse input string.");
		}
		return {
			day: data[1],
			start_time: convertTimeStringToMinutes(data[2]),
			end_time: convertTimeStringToMinutes(data[3]),
		};
	});
};

/**
 *
 * @param {String} day
 * @param {int} start_time
 * @param {int} end_time
 * @returns {int} The calculated dollar amount to be paid for the specified hour range
 */
const calculateHourValue = (day, start_time, end_time) => {
	const hourInMinutes = {
		midnight: 0,
		nineAM: 540,
		sixPM: 1080,
		eightPM: 1200,
	};

	const rates = {
		weekly: [25, 15, 20],
		weekend: [30, 20, 25],
	};

	const isWeeklyHours = ["MO", "TU", "WE", "TH", "FR"].includes(day);

	const hours = Math.round(end_time / 60 - start_time / 60);

	if (start_time >= 1 && end_time <= hourInMinutes["nineAM"]) {
		return isWeeklyHours
			? hours * rates["weekly"][0]
			: hours * rates["weekend"][0];
	}

	if (
		start_time > hourInMinutes["nineAM"] &&
		end_time <= hourInMinutes["sixPM"]
	) {
		return isWeeklyHours
			? hours * rates["weekly"][1]
			: hours * rates["weekend"][1];
	}

	if (
		start_time > hourInMinutes["sixPM"] &&
		(end_time > hourInMinutes["sixPM"] || end_time === 0)
	) {
		return isWeeklyHours
			? hours * rates["weekly"][2]
			: hours * rates["weekend"][2];
	}

	throw new Error("Unable to determine the amount to pay");
};

/**
 *
 * @param {Array} hours_worked The array representation of the employee's worked hours
 * @returns {int} The total dollar amount to be paid to an employee
 */
const calculateEmployeePayroll = (hours_worked) => {
	return hours_worked.reduce((carry, day) => {
		const hour_value = calculateHourValue(
			day.day,
			day.start_time,
			day.end_time
		);

		return (carry += hour_value);
	}, 0);
};

/**
 * Script's main method, that reads the input file specified in the command line arg and outputs the total dollar amount to be paid to an employee
 * @returns void
 */
const start = () => {
	const command_line_args = process.argv.slice(2);
	if (command_line_args.length !== 1) {
		console.log("Usage: npm start [input_filename]");
		return process.exit();
	}

	const input_file_name = command_line_args[0];
	if (!input_file_name.endsWith(".txt")) {
		console.log("Input file must be of .txt format");
		return process.exit();
	}

	fs.readFile(input_file_name, "utf8")
		.then((inputSring) => {
			try {
				const employee_name = getEmployeeName(inputSring);
				const hours_worked = getEmployeeWorkHours(inputSring);
				const total_to_pay = calculateEmployeePayroll(hours_worked);
				console.log(
					"The amount to pay",
					employee_name,
					"is:",
					total_to_pay,
					"USD"
				);
			} catch (err) {
				console.error(err);
				return process.exit();
			}
		})
		.catch(() => {
			console.error("Could not locate file", input_file_name);
		});
};

if (!process.env.JEST_WORKER_ID) {
	start();
}

module.exports = {
	getEmployeeName,
	convertTimeStringToMinutes,
	getEmployeeWorkHours,
	calculateHourValue,
	calculateEmployeePayroll,
};
