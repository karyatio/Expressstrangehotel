process.env.NODE_ENV = "test";

const chai = require("chai");
var expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

var guestId;
describe("/GET guest", () => {
	/*
	 * GET api/guests
	 *
	 */
	it("Should get guest", (done) => {
		chai
			.request(app)
			.get("/api/guests")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.have.property("message");
				expect(res.body.message).to.equal("Success read guest");
				expect(res.body).to.have.property("data");
				done();
			});
	});
});

describe("/POST post guest", () => {
	it("Should create new guest", (done) => {
		chai
			.request(app)
			.post("/api/guests")
			.send({
				name: "tio"
			})
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.have.property("message");
				expect(res.body.message).to.equal("Success create guest");
				expect(res.body).to.have.property("data");
				guestId = res.body.data.id;
				done();
			});
	});
});

describe("/PUT update guest", () => {
	it("Should Update Satuan", (done) => {
		chai
			.request(app)
			.put(`/api/guests/${guestId}`)
			.send({ name: "Tio Jelek" })
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.have.property("message");
				expect(res.body.message).to.equal("Success update guest");
				expect(res.body).to.have.property("data");
				done();
			});
	});
});

describe("/DELETE delete guest", () => {
	it("Should delete guest ", function(done) {
		chai
			.request(app)
			.del(`/api/guests/${guestId}`)
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.have.property("message");
				expect(res.body.message).to.equal("Success delete guest");
				expect(res.body).to.have.property("data");
				done();
			});
	});
});
