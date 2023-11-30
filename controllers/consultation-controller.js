const User = require("../models/user-model");

module.exports = {
  async getAllConsultationController(req, res) {
    const userId = req.userId;
    try {
      const consultations = await User.findById(userId)
        .select("name consultations")
        .exec();

      res.status(200).json({
        message: "success get consultations",
        data: consultations,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },

  async addConsultationController(req, res) {
    const data = req.body;
    const userId = req.userId;
    const user = await User.findById(userId).select("-__v");
    user.consultations.push(data);

    try {
      await user.save();
      res.status(200).json({
        message: "success add consultation",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  //   async getConsultationByIdController(req, res) {
  //     const { id } = req.params;

  //     try {
  //       const consultation = await Consultation.findById(id).select("-__v");

  //       if (!consultation) {
  //         res.status(404).json({ message: "data not found" });
  //         return;
  //       }

  //       res.json({
  //         message: "success get consultation",
  //         data: consultation,
  //       });
  //     } catch (error) {
  //       if (error.name === "CastError") {
  //         return res.status(404).json({
  //           message: "data not found",
  //         });
  //       }

  //       res.status(500).json({ message: error });
  //     }
  //   },

  //   async getMostPopularTags(_, res) {
  //     try {
  //       const tags = await Consultation.aggregate([
  //         { $unwind: "$tags" },
  //         { $group: { _id: "$tags", count: { $sum: 1 } } },
  //         { $sort: { count: -1 } },
  //         { $limit: 10 },
  //       ]).exec();

  //       res.json({
  //         message: "success get consultation",
  //         data: tags,
  //       });
  //     } catch (error) {
  //       res.status(500).json({ message: error });
  //     }
  //   },

  //   async addCommentController(req, res) {
  //     const data = req.body;
  //     const { id } = req.params;
  //     const userId = req.userId;
  //     const user = await User.findById(userId);
  //     const consultation = await Consultation.findById(id);

  //     if (!consultation) {
  //       res.status(404).json({ message: "data not found" });
  //       return;
  //     }

  //     consultation.comments.push({
  //       ...data,
  //       author: user.name,
  //       author_avatar_url: user.profile_url,
  //       created_at: new Date(),
  //     });

  //     try {
  //       await consultation.save();
  //       res.status(201).json({
  //         message: "success add consultation",
  //         data: consultation,
  //       });
  //     } catch (error) {
  //       res.status(500).json({ message: error });
  //     }
  //   },
};
