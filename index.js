// Your code here
function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employeeData) {
    return employeeData.map(function (array) {
        return createEmployeeRecord(array);
    })
}

function createTimeInEvent (employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function createTimeOutEvent (employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}


function hoursWorkedOnDate (employee, particularDateWorked) {
    let timeInEvent = employee.timeInEvents.find(function (event) {
        return event.date === particularDateWorked
    })

    let timeOutEvent = employee.timeOutEvents.find(function (event) {
        return event.date === particularDateWorked
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate (employee, dateWorked) {
    let wages = hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour;
    return parseFloat(wages.toString());
}

function allWagesFor(employee) {
    let paymentDates = employee.timeInEvents.map(function (event) {
        return event.date
    })

    let paymentForAllDates = paymentDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d);
    }, 0)
    return paymentForAllDates;
}

function calculatePayroll (employeeRecordsArray) {
    return employeeRecordsArray.reduce(function (memo, records) {
        return memo + allWagesFor(records);
    }, 0)
}
