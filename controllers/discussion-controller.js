const Discussion = require("../models/discussion-model");
const User = require("../models/user-model");

module.exports = {
  async getAllDiscussionController(req, res) {
    const { sort } = req.query;
    const sign = sort === "ASC" ? "" : "-";
    try {
      const discussions = await Discussion.find({})
        .select("author author_avatar_url question liked created_at")
        .sort(`${sign}created_at`)
        .exec();

      res.status(200).json({
        message: "success get discussions",
        data: discussions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },

  async addDiscussionController(req, res) {
    const data = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    const discussion = new Discussion({
      ...data,
      author: user.name,
      author_avatar_url: user.profile_url,
      liked: 0,
      created_at: new Date(),
      comments: [],
    });

    try {
      await discussion.save();
      res.status(201).json({
        message: "success add discussion",
        data: discussion,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async getDiscussionByIdController(req, res) {
    const { id } = req.params;

    try {
      const discussion = await Discussion.findById(id).select("-__v");

      if (!discussion) {
        res.status(404).json({ message: "data not found" });
        return;
      }

      res.json({
        message: "success get discussion",
        data: discussion,
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(404).json({
          message: "data not found",
        });
      }

      res.status(500).json({ message: error });
    }
  },

  async getMostPopularTags(_, res) {
    try {
      const tags = await Discussion.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]).exec();

      res.json({
        message: "success get discussion",
        data: tags,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async addCommentController(req, res) {
    const data = req.body;
    const { id } = req.params;
    const userId = req.userId;
    const user = await User.findById(userId);
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      res.status(404).json({ message: "data not found" });
      return;
    }

    discussion.comments.push({
      ...data,
      author: user.name,
      author_avatar_url: user.profile_url,
      created_at: new Date(),
    });

    try {
      await discussion.save();
      res.status(201).json({
        message: "success add discussion",
        data: discussion,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
