var supertest = require("supertest");
var expect = require("expect");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

var putItem99ZReqMock = require('./mocks/putItem99ZReqMock');
var postItem99ZOccupedFalseReqMock = require('./mocks/postItem99ZOccupedFalseReqMock');
//var item99ZResMock = require('./mocks/item99ZResMock');

var itemAdded;
// UNIT test begin

describe("Item tests", function(){

  it("should return inserted (id of) item", function(done) {
    server
    .put("/items/")
    .send(putItem99ZReqMock)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        itemAdded = res.body;
        expect(res.body._id).toExist();
        done();
      } else {
        throw err;
      }
    });
  });

  it("should return list of items", function(done) {
     server
    .get("/items/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body.items).toExist();
        expect(res.body.items).toInclude(itemAdded, "items doesn't contains " + itemAdded);
        done();
      } else {
        throw err;
      }
    });
  });

  it("should return item with field occuped update", function(done) {
    server
    .post("/items/" + itemId)
    .send(postItem99ZOccupedFalseReqMock)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(itemId, res.body._id + ' not equal to ' +  itemId);
        expect(res.body.occuped).toBe(postItem99ZOccupedFalseReqMock.occuped, res.body.occuped + ' not equal to ' +  postItem99ZOccupedFalseReqMock.occuped);
      } else {
        throw err;
      }
      done();
    });
  });

  it("should return asked item",function(done) {
    server
    .get("/items/" + itemId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(itemId);
        done();
      } else {
        throw err;
      }
    });
  });

  it("should delete asked item",function(done) {
    server
    .delete("/items/" + itemId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(itemId);
        done();
      } else {
        throw err;
      }
    });
  });

});