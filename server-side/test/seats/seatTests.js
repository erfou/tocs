var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.
//var server = supertest.agent("http://localhost:8080");
var server = supertest.agent("https://tocs-eric06.c9users.io");

var putSeatReq = require('./mocks/putSeatReqMock.json');
var postSeatReq = require('./mocks/postSeatReqMock.json');


var seatId = putSeatReq.position.row + putSeatReq.position.column;

// UNIT test begin

describe("Seat tests",function(){

  it("should return inserted (id of) seat",function(done) {
    server
    .put("/seats/")
    .send(putSeatReq)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        if(res.body) {
          done();
        }
      } else {
        throw err;
      }
    });
  });

  it("should return list of seats",function(done) {
     server
    .get("/seats/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(res) {
      var seats = res.body.seats;
      var hasExpectedResult = false;
      for(var i = 0; i < seats.length; i++) {
        if(seats[i]._id === seatId) {
          hasExpectedResult = true;
        }
      	if(hasExpectedResult.should.equal(true)) {
          done();
      	}
      }
    });
  });

  it("should return seat with field occuped update",function(done) {
    server
    .post("/seats/" + seatId)
    .send(postSeatReq)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(res) {
      res.should.equal("");
      done();
    });
  });

  it("should return asked seat",function(done) {
    server
    .get("/seats/" + seatId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(res) {
      res.body._id.should.equal(seatId);
      done();
    });
  });

  it("should delete asked seat",function(done) {
    server
    .delete("/seats/" + seatId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(res) {
      res.body.occuped.should.equal(postSeatReq.occuped);
      done();
    });
  });

  it("should not return asked seat (deleted earlier)",function(done) {
    server
    .get("/seats/" + seatId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(res) {
      res.body.should.equal("zez");
      done();
    });
  });

});