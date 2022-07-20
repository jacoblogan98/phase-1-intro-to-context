function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrArray) {
    const employees = arrArray.map(employeeArray => createEmployeeRecord(employeeArray))
    return employees
}

function createTimeInEvent(employeeObj, date) {
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.slice(-4)),
        date: date.slice(0, 10)
    })

    return employeeObj
}

function createTimeOutEvent(employeeObj, date) {
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.slice(-4)),
        date: date.slice(0, 10)
    })

    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    const timeIn = employeeObj.timeInEvents.find(event => event.date === date)
    const timeOut = employeeObj.timeOutEvents.find(event => event.date === date)
    const hours = (timeOut.hour - timeIn.hour) / 100

    return hours
}

function wagesEarnedOnDate(employeeObj, date) {
    const hours = hoursWorkedOnDate(employeeObj, date)

    return hours * employeeObj.payPerHour
}

function allWagesFor(employeeObj) {
    const payEarned = employeeObj.timeInEvents.map(event => wagesEarnedOnDate(employeeObj, event.date))
    const sumPay = payEarned.reduce((prev, current) => prev + current, 0)

    return sumPay
}

function calculatePayroll(allEmployeesArray) {
    const payArray = allEmployeesArray.map(employeeObj => allWagesFor(employeeObj))
    const payroll = payArray.reduce((prev, current) => prev + current, 0)

    return payroll
}