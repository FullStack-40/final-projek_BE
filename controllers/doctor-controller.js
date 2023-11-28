const Doctor = require("../models/doctor-model");

module.exports = {
  async getAllDoctorController(req, res) {
    try {
      const doctors = await Doctor.find({})
        .select("name profile_url specialist experience rating price")
        .exec();

      res.status(200).json({
        message: "success get doctors",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },

  async getDoctorByIdController(req, res) {
    const { id } = req.params;

    try {
      const doctor = await Doctor.findById(id).select("-__v");

      if (!doctor) {
        res.status(404).json({ message: "data not found" });
        return;
      }

      res.json({
        message: "success get doctor",
        data: doctor,
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
