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
    data.status = "Menunggu";
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
};
