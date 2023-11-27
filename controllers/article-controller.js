const Article = require("../models/article-model");

module.exports = {
  async getAllArticleController(req, res) {
    try {
      const articles = await Article.find({})
        .select("author title content category created_at thumbnail_url")
        .exec();

      res.status(200).json({
        message: "success get Articles",
        data: articles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },

  async getArticleByIdController(req, res) {
    const { id } = req.params;

    try {
      const article = await Article.findById(id).select("-__v");

      if (!article) {
        res.status(404).json({ message: "data not found" });
        return;
      }

      res.json({
        message: "success get Article",
        data: article,
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
};
