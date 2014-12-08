var _ = require('lodash');

var contentHelper = require('../Helpers/ContentHelper');
var moment = require('moment');

var dayOfWeekToCheck = 0;

contentHelper.getContentsFromFile(process.argv, __dirname, function (err, content) {
    if (err) {
        console.log(err);
    } else {
        var pairs = content.split('\r\n');
        _.forEach(pairs, processPair);
    }
});

function processPair(pair) {
    var months = getMonths(pair);
    var monthsWithFiveOfAWeekday = 0;
    if (validateValues(months)) {
        var month1 = months[0] + ' ' + months[1];
        var month2 = months[2] + ' ' + months[3];
        var startDate = moment(new Date(month1));
        var endDate = moment(new Date(month2));
        if (!startDate.isValid() || !endDate.isValid()) {
            console.log('Please enter valid dates');
        } else {
            console.log(pair);

            var difference = endDate.diff(startDate, 'months') + 1;

            _.times(difference, function (n) {
                var date = startDate.clone().add(n, 'months');
                if(checkIfFiveDaysOfWeekInMonth(date)) {
                    monthsWithFiveOfAWeekday = monthsWithFiveOfAWeekday + 1;
                }

            });
        }
    } else {
        console.log('Invalid dates.');
    }
    console.log(monthsWithFiveOfAWeekday);
    console.log('------------------');
}

function getNextDayOfWeekNumber(dayOfWeek) {
    return dayOfWeek > 0 ? dayOfWeek : dayOfWeek + 7;
}

function checkIfFiveDaysOfWeekInMonth(date) {
    // clone the date to manipulate
    var month = date.month();

    var firstDateForDayOfWeek;
    if (date.weekday() === dayOfWeekToCheck) {
        // clone the date to manipulate
        firstDateForDayOfWeek = date.clone();
    } else {
        firstDateForDayOfWeek = date.clone().day(getNextDayOfWeekNumber(dayOfWeekToCheck));
    }

    // Add 28 days (5th) to the first day of the week and check if same month
    var month28DaysLater = firstDateForDayOfWeek.add(28, 'days').month();

    if (month === month28DaysLater) {
        return true;
    } else {
        return false;
    }
}

function validateValues(values) {
    if (values.length !== 4) {
        return false;
    }
    return true;
}

function getMonths(content) {
    var words = content.split(' ');
    return words;
}