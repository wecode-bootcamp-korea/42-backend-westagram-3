const postsDao = require("../models/postDao");

//create post
const createPosts = async (title, content, imageUrl, userId) => {
  const createPosts = await postsDao.createPosts(
    title,
    content,
    imageUrl,
    userId
  );
  return createPosts;
};

//get posts
const getPosts = async () => {
  const posts = await postsDao.getPosts();
  return posts;
};

//get posts targeting user
const postsOfUser = async (userId) => {
  const posts = await postsDao.postsOfUser(userId);
  return posts;
};

//modify posts
const modifyPosts = async (postContent, postId) => {
  const posts = await postsDao.modifyPosts(postContent, postId);
  return posts;
};

//delete posts
const deletePosts = async (postId) => {
  const posts = await postsDao.deletePosts(postId);
  return posts;
};

module.exports = {
  createPosts,
  getPosts,
  postsOfUser,
  modifyPosts,
  deletePosts,
};
