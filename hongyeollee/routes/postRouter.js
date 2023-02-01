const express = require("express");

const router = express.Router();

const postController = require("../controllers/postController");

router.post("/post", postController.createPosts);
router.get("/posts", postController.getPosts);
router.get("/posts/user/:userId", postController.postsOfUser);
router.patch("/posts/:postId", postController.modifyPosts);
router.delete("/posts/:postId", postController.deletePosts);

module.exports = { router };
