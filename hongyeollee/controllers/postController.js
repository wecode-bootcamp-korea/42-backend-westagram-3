const postService = require("../services/postService");

//create posts
const createPosts = async (req, res) => {
  try {
    const { title, content, imageUrl, userId } = req.body;

    if (!title || !content || !userId) {
      res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.createPosts(title, content, imageUrl, userId);
    res.status(201).json({ message: "POSTING_SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//get posts
const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//get posts of user
const postsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postService.postsOfUser(userId);
    if (!userId) {
      res.status(400).json({ message: "KEY_ERROR" });
    }

    res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//modify posts
const modifyPosts = async (req, res) => {
  try {
    const { postId } = req.params;
    const { postContent } = req.body;
    if (!postContent) {
      res.status(400).json({ message: "KEY_ERROR" });
    }
    const posts = await postService.modifyPosts(postContent, postId);
    res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//delete posts
const deletePosts = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.deletePosts(postId);
    res.status(200).json({ message: "POSTING_DELETED" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
  getPosts,
  postsOfUser,
  modifyPosts,
  deletePosts,
};
