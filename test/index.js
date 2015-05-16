var should = require('chai')
    .should();
var commentDoc = require('../index');
var read = commentDoc.read;
var filter = commentDoc.filter;
var write = commentDoc.write;
var extract = commentDoc.extract;

describe('#read', function () {
    it('should read the contents of a file', function () {
        read('testRead.js')
          .should.equal('// how now\nbrown cow\n');
    });
    it('is a function', function(){
        (typeof read).should.equal('function');
    });
});

describe('#filter', function () {
    it('should return an array with the file name and only the comments in a file and their line number', function () {
      var fileName = 'testRead.js',
          text = read(fileName),
          filtererdText = filter(fileName, text);

        (filtererdText[0]).should.equal('From testRead.js\n');
        (filtererdText[1]).should.equal('Line 0: how now');
    });
    it('is a function', function(){
        (typeof filter).should.equal('function');
    });
});

describe('#write', function() {
    it('should return the file(with filename) containing only the comments from the original file', function (){
      var fileName = 'testRead.js',
          text = read(fileName),
          filteredText = filter(fileName, text),
          writeFile = write('testResult.md', filteredText),
          newFile = 'testResult.md',
          readNewFile = read(newFile);

          (readNewFile).should.equal('From testRead.js\n\nLine 0: how now\n');
    });
    it('is a function', function(){
        (typeof write).should.equal('function');
    });
});

describe('#extract', function() {
    it('should return a file with only the comments', function(){
        extract('testRead.js', 'testResult.md');
        (read('testResult.md')).should.equal('From testRead.js\n\nLine 0: how now\nFrom testRead.js\n\nLine 0: how now\n');
    });
    it('is a function', function(){
        (typeof extract).should.equal('function');
    });
});
