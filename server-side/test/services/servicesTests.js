var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

// UNIT test begin

describe("Seat status unit test",function(){

  it("should return list of seats",function(done){

     server
    .get("/seats/list")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.body.message.should.equal('List of seats.');
      done();
    });
  });

  it("should return sucess of request",function(done){

    server
    .post("/seats/status")
    .send(require('./mocks/seatStatusReqMock'))
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      var mockRes = require('./mocks/seatStatusResMock');
      res.body.message.should.equal(mockRes.message);
      done();
    });
  });
});