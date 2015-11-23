require("should");
var fs = require("fs");

var name = "test";

describe("Name", function() {
    it("The name should be test", function() {
        name.should.eql("test");
    });
});

var Person = function(name) {
    this.name = name;
};
var test = new Person(name);

describe("InstanceOf", function() {
    it("test should be an instance of Person", function() {
        test.should.be.an.instanceof(Person);
    });

    it("test should be an instance of Object", function() {
        test.should.be.an.instanceof(Object);
    });
});
describe("Property", function() {
    it("test should have property name", function() {
        test.should.have.property("name");
    });
});

describe("readFile", function() {
    it("The file content should be test", function(done) {
        fs.readFile("text.txt", "utf-8", function(err, data) {
            data.should.eql("test");
            done();
        });
    });
});

describe('Empty', function() {
    it('{} should be Empty', function() {
        ({}).should.be.empty();
    })
})