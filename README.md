## 💰 ACME Payroll Calculator - Pablo Westphalen's implementation of ioet's JavaScript Coding Exercise

ACME's Payroll calculator takes an input .txt file and calculates the total dollar amount that is to be paid to an employee.

## Input file syntax

`EMPLOYEE_NAME`=`ABBREVIATED_DAY_NAME`:`RANGE_OF_HOURS_WORKED`

## Input file info

`ABBREVIATED_DAY_NAME` must be one of `MO`, `TU`, `WE`, `TH`, `FR`, `SA` or `SU`
`RANGE_OF_HOURS_WORKED` must follow the `hh:mm-hh:mm` format (military time)

At least five sets of data must be specified, and they must be separated by commas `,`

Example: `RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00`

## Installation

This script does not have any dependency and can be directly run with npm via one of the scripts specified below, but the `jest` test library can be installed with

```
npm install
```

## Available scripts

- `npm start [input_file_name]` Run the script, parsing the specified input .txt file
- `npm test` Run unit tests (requires `npm install`)
- `npm run sample1` Run script with the provided sample file for the RENE employee
- `npm run sample2` Run script with the provided sample file for the ASTRID employee

## Solution Overview

A minimalistic, functional-programming based solution was designed to implement this coding exercise. Pure functions with the help of the JavaScript language features and Node's standard library were written to break down the parsing of the input file and the rendering of the expected output. Regular expressions were used to tersely extract relevant data from the input string. The Jest library was chosen for running the unit tests. JSDoc comments were used to annotate the functions. A Git history would've been nice-to-have, but i worked on this exercise on a single mental sitting and when i found the code to be commit-worthy is when i was about done with it.
