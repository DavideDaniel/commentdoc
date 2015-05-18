// dependencies
var fs = require("fs");

// module for commentDoc
module.exports = {
    read: function (filePath) {
        var text = fs.readFileSync(filePath, 'utf8', function (err) {
            if (err) {
                console.error(err);
            }
        });
        return text
    },
    filter: function (fileName, text) {
        var pattern = new RegExp("(\/\/...*\b)", "ig");
        var lines = text.split(/\n/);
        var title = 'From ' + fileName + '\n';
        var listOfLines = [title];
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('// ') >= 0) {
                var newLine = lines[i].replace('\/\/ ', '');
                listOfLines.push('Line ' + i + ': ' + newLine);
            }
            else {
                console.log('not replacing :' + lines[i]);
            }
        }
        //console.log(listOfLines);
        return listOfLines
    },
    write: function (fileToWrite, filteredText) {
        for (var i = 0; i < filteredText.length; i++) {
            var line = filteredText[i] + '\n'
            fs.appendFileSync(fileToWrite, line, encoding = 'utf8', function (err) {
                if (err) {
                    console.error(err);
                };
                console.log(fileToWrite + 'ready.');
            });
        };
    },
    extract: function (fileToRead, newFile) { // params taken as strings
        var text = module.exports.read(fileToRead);
        console.log(text);
        text = module.exports.filter(fileToRead, text);
        //console.log(text)
        module.exports.write(newFile, text);
    }
}
