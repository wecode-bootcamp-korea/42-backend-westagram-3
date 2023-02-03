const likeService = require("../services/likeService");

const like = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await likeService.like(userId, postId);
    res.status(200).json({ message: "MAKE_LIKE_SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  like,
};
