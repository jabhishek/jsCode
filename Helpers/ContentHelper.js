var fs = require('fs');

exports.getContentsFromFile = function (args, dirName, cb) {
    var inputFile = args.splice(2)[0];

    if (!inputFile) {
        cb('Please specify the input file name as a parameter.');
    } else {
        fs.readFile(dirName + '/' + inputFile, function (err, data) {
            if (err) {
                cb('Error reading file.');
            } else {
                var content = data.toString();
                cb(null, content);
            }
        });
    }
};

