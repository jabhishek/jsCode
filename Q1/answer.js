var _ = require('lodash');

var contentHelper = require('../Helpers/ContentHelper');

contentHelper.getContentsFromFile(process.argv, __dirname, function(err, content) {
    if (err) {
        console.log(err);
    } else {
        var words = _.compact(getWords(content));
        console.log(words.reverse().join(' '));
    }
});

function getWords(content) {
    var separators = [' ', '\r\n'];
    var words = content.split(new RegExp(separators.join('|')));
    return words;
}