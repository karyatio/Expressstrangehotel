const express = require("express");
const router = express.Router();
const { Guest } = require("../models");
const Op = require("sequelize");

router.get("/", (req, res) => {
	/*
	 * GET api/guest
	 * this function display all guest
	 */
	Guest.findAll()
		.then((guest) => {
			res.status(200).json({ message: "Success read guest", data: guest });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		});
});

router.post("/", (req, res) => {
	/*
	 * POST api/guest
	 * this function add guest
	 */

	const { name } = req.body;
	Guest.create({ name })
		.then((guest) => {
			res.status(201).json({ message: "Success create guest", data: guest });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		});
});

router.put("/:id", (req, res) => {
	/*
	 * PUT api/guest/2
	 * this function update guest
	 */
	const guestId = req.params.id;
	const { name } = req.body;
	Guest.findOne({ where: { id: guestId } })
		.then((guest) => {
			if (guest) {
				return guest.update({ name }).then((updateGuest) => {
					res
						.status(201)
						.json({ message: "Success update guest", data: updateGuest });
				});
			} else {
				res.status(400).json({ message: "Guest Not Found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		});
});

router.delete("/:id", (req, res) => {
	/*
	 *DELETE api/guest/2
	 *
	 */
	const guestId = req.params.id;
	Guest.findOne({ where: { id: guestId } })
		.then((guest) => {
			return guest.destroy();
		})
		.then((guest) => {
			res.status(200).json({ message: "Success delete guest", data: guest });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		});
});

module.exports = router;
