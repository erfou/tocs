var supertest = require("supertest");
var expect = require("expect");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

var putCategoryTestReqMock = require('./mocks/putCategoryTestReqMock');
var postCategoryTestReqMock = require('./mocks/postCategoryTestReqMock');

var categoryTestId;
// test begin

describe("Category tests", function(){


  it("should return inserted (id of) category", function(done) {
    server
    .put("/categories/")
    .send(putCategoryTestReqMock)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        categoryTestId = res.body._id;
        expect(res.body._id).toExist();
        done();
      } else {
        throw err;
      }
    });
  });

  it("should return list of categories", function(done) {
     server
    .get("/categories/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body.categories).toExist();
        done();
      } else {
        throw err;
      }
    });
  });

  it("should return category without ECO has compatible class", function(done) {
    server
    .post("/categories/" + categoryTestId)
    .send(postCategoryTestReqMock)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(categoryTestId, res.body._id + " not equal to " +  categoryTestId);
        expect(res.body.compatibleClasses).toExclude("ECO", "compatibleClasses should contain ECO ");
      } else {
        throw err;
      }
      done();
    });
  });

  it("should return asked category",function(done) {
    server
    .get("/categories/" + categoryTestId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(categoryTestId);
        done();
      } else {
        throw err;
      }
    });
  });

  it("should delete asked category",function(done) {
    server
    .delete("/categories/" + categoryTestId)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
      if(!err) {
        expect(res).toExist();
        expect(res.body).toExist();
        expect(res.body._id).toEqual(categoryTestId);
        done();
      } else {
        throw err;
      }
    });
  });

});