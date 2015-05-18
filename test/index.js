var commentDoc = require('../index');
var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('assert');
var read = commentDoc.read;
var filter = commentDoc.filter;
var write = commentDoc.write;
var extract = commentDoc.extract;

describe('#read', function () {
	it('is a function', function () {
		expect(typeof read).to.equal('function');
	});
	it('should throw err if no file is present', function () {
		expect(read).to.throw(Error);
	});
	it('should read the contents of a file', function () {
		var expected = '// how now\nbrown cow';
		var actual = read('testRead.js');
		assert.equal(expected, actual);
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
          writeFile = write('testWrite.md', filteredText),
          newFile = 'testWrite.md',
          readNewFile = read(newFile);

          (readNewFile).should.equal('From testRead.js\n\nLine 0: how now\n');
    });
    it('is a function', function(){
        (typeof write).should.equal('function');
    });
});
