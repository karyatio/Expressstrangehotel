process.env.NODE_ENV = "test";

const Room = require("../models").Room;
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
chai.use(chaiHttp);
const async = require("async");

describe("/GET rooms", () => {
  /*
   * GET api/rooms
   *
   */
  it("It should ge all rooms", done => {
    chai
      .request(app)
      .get("/api/rooms")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.should.have.property("message");
        done();
      });
  });
});

describe("/POST rooms", () => {
  /*
   * POST api/rooms
   *
   */
  it("it sould post the user info", done => {
    const room = {
      roomNumber: "5"
    };

    chai
      .request(app)
      .post("/api/rooms")
      .send(room)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.should.have.property("message");
        done();
      });
  });
});

describe("/PUT/:id room", () => {
  it("should update user info", done => {
    const room = {
      roomNumber: "10"
    };
    const roomId = 1;
    chai
      .request(app)
      .put("/api/rooms/" + roomId)
      .send(room)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("data");
        res.body.should.have.property("message");
        done();
      });
  });

  it("should not update user info", done => {
    const room = {
      roomNumber: "1"
    };
    const roomId = 999;
    chai
      .request(app)
      .put("/api/rooms/" + roomId)
      .send(room)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });
});
