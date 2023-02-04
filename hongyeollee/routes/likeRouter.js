const express = require("express");

const router = express.Router();

const likeController = require("../controllers/likeController");

router.post("/like/:userId/:postId", likeController.like);

module.exports = { router };
