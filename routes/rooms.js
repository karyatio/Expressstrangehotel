var express = require("express");
var router = express.Router();
var { Room } = require("../models");
var Op = require("sequelize").Op;

router.get("/", (req, res) => {
  /*
   * GET rooms/
   * this function display all rooms
   */

  Room.findAll()
    .then(rooms => {
      res.status(200).json({ rooms: rooms });
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

router.post("/", (req, res) => {
  /*
   * POST rooms/
   * this function add rooms
   */

  const { roomNumber } = req.body;

  Room.create({ roomNumber: roomNumber })
    .then(room => {
      res
        .status(201)
        .json({ room: room, message: "Successfully creating room" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/:id", (req, res) => {
  /*
   * GET rooms/2
   * this function get a single room
   */

  const { id } = req.params;

  Room.findOne({ where: { id: { [Op.eq]: id } } })
    .then(room => {
      res
        .status(200)
        .json({ room: room, message: "Successfully getting room" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.put("/:id", (req, res) => {
  /*
   * PUT rooms/2
   * Update single room
   */

  const { id } = req.params;
  const { roomNumber } = req.body;

  Room.findOne({ where: { id: { [Op.eq]: id } } })
    .then(room => {
      if (room) {
        return room.update({ roomNumber }).then(room => {
          res
            .status(201)
            .json({ room: room, message: "Successfully update room" });
        });
      } else {
        res.status(400).json({ message: "room not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.delete("/:id", (req, res) => {
  /*
   * DELETE rooms/2
   * Delete a room with the given id
   */

  const { id } = req.params;
  const { roomNumber } = req.body;

  Room.findOne({ where: { id: { [Op.eq]: id } } })
    .then(room => {
      return room.destroy();
    })
    .then(room => {
      res.status(200).json({ room: room, message: "Successfully delete room" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
