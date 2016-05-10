var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

// UNIT test begin

describe("Seat tests",function(){

  it("should return seat with id",function(done){
    server
    .put("/seats/")
    .send(require('./seats/mocks/putSeatReqMock.json'))
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      var mockRes = require('./seats/mocks/putSeatResMock');
      res.body._id.should.equal(mockRes._id);
      done();
    });
  });
  it("should return list of seats",function(done){
     server
    .get("/seats/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      for(seat of res.body.seats) {
      	var mockRes = require('./seats/mocks/putSeatResMock');
      	seat._id.should.equal(mockRes._id);
      }
      done();
    });
  });

});