var _ = require('lodash');
var contentHelper = require('../Helpers/ContentHelper');

contentHelper.getContentsFromFile(process.argv, __dirname, function(err, content) {
    if (err) {
        console.log(err);
    } else {
        var pairs = content.split('\r\n');
        _.forEach(pairs, processPair);
    }
});

function processPair(pair) {
    var numbersAsStrings = pair.split(' ');
    var powers = [];
    // convert strings to numbers
    var numbers = getPairConvertedToIntegers(numbersAsStrings);
    if (numbers.length === 2) {
        var num1 = numbers[0];
        var num2 = numbers[1];
        console.log(numbers);
        for (var i = num1; i <= num2; i++) {
            for (var j = num1; j <= num2; j++) {
                powers.push(Math.pow(i, j));
            }
        }
        var uniquePowers = _.uniq(powers);
        console.log('Total count of powers: ' + powers.length);
        console.log('Unique Powers: ' + uniquePowers);
        console.log('Number of unique powers: ' + uniquePowers.length);
    } else {
        console.log('Please specify 2 valid numbers on a line. Invalid numbers: ' + pair);
    }
    console.log('-----------------------');
}

function getPairConvertedToIntegers(pair) {
    return _.chain(pair)
        .map(function (num) {
            return parseInt(num);
        })
        .reject(function (num) {
            return num !== num || num < 0;
        })
        .sortBy(function (num) {
            return num;
        }).value();
}