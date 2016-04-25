var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

// UNIT test begin

describe("Seat status unit test",function(){

  it("should return list of seats",function(done){

    // calling home page api
    server
    .get("/seats/list")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.body.message.should.equal('List of seats.');
      // Error key should be false.
      done();
    });
  });

  it("should return new status of seat passed in request",function(done){

    // calling home page api
    server
    .post("/seats/status")
    .send(require('./mocks/seatStatusReqMock'))
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      var mockRes = require('./mocks/seatStatusResMock');
      res.body.message.should.equal(mockRes.message);
      // Error key should be false.
      done();
    });
  });

});