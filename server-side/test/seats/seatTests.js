var supertest = require("supertest");
var expect = require("expect");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

var putSeat99ZReqMock = require('./mocks/putSeat99ZReqMock');
var postSeat99ZOccupedFalseReqMock = require('./mocks/postSeat99ZOccupedFalseReqMock');

var seatId = putSeat99ZReqMock.position.row + putSeat99ZReqMock.position.column;

var seatAdded;
// test begin

describe("Seat tests", function(){


  it("should return inserted (id of) seat", function(done) {
    server
    .put("/seats/")
    .send(putSeat99ZReqMock)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        seatAdded = res.body;
        expect(res.body._id).toEqual(seatId, res.body._id + ' not equal to ' +  seatId);
        done();
      } else {
        throw err;
      }
    });
  });

  it("should return list of seats", function(done) {
     server
    .get("/seats/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body.seats).toExist();
        expect(res.body.seats).toInclude(seatAdded, "seats: " + JSON.stringify(res.body.seats)+ " doesn't contains " + JSON.stringify(seatAdded));
        done();
      } else {
        throw err;
      }
    });
  });

  it("should return seat with field occuped update", function(done) {
    server
    .post("/seats/" + seatId)
    .send(postSeat99ZOccupedFalseReqMock)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(seatId, res.body._id + ' not equal to ' +  seatId);
        expect(res.body.occuped).toBe(postSeat99ZOccupedFalseReqMock.occuped, res.body.occuped + ' not equal to ' +  postSeat99ZOccupedFalseReqMock.occuped);
      } else {
        throw err;
      }
      done();
    });
  });

  it("should return asked seat",function(done) {
    server
    .get("/seats/" + seatId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(seatId);
        done();
      } else {
        throw err;
      }
    });
  });

  it("should delete asked seat",function(done) {
    server
    .delete("/seats/" + seatId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(seatId);
        done();
      } else {
        throw err;
      }
    });
  });

});