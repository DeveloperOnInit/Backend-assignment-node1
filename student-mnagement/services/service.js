const model = require("../db_uttiles/models");

exports.addDetailes = async (req, res) => {
   try {
      const { name, address, latitude, longitude } = req.body;

      if (
         !name ||
         !address ||
         isNaN(latitude) ||
         isNaN(longitude) ||
         typeof latitude !== "number" ||
         typeof longitude !== "number" ||
         latitude < -90 ||
         latitude > 90 ||
         longitude < -180 ||
         longitude > 180
      ) {
         return res.status(400).json({ error: "Invalid input data" });
      }

      let result = await model.insertNewData(name, address, latitude, longitude);

      res.status(201).json({ message: "Data inserted successfully", schoolId: result });
   } catch (error) {
      console.error("Error in addDetailes:", error);
      return res.status(500).json({ error: "Saving data failed" });
   }
};

exports.getDetailes = async (req, res) => {
   try {
      const { latitude, longitude } = req.body;
      if (
         isNaN(latitude) ||
         isNaN(longitude) ||
         typeof latitude !== "number" ||
         typeof longitude !== "number" ||
         latitude < -90 ||
         latitude > 90 ||
         longitude < -180 ||
         longitude > 180
      ) {
         return res.status(400).json({ error: "Invalid latitude or longitude" });
      }

      let result = await model.getList(latitude, longitude);

      res.status(201).json({ message: "Data fetch successfully", result });
   } catch (error) {
      console.error("Error in fetch data:", error);
      return res.status(500).json({ error: "getting data failed" });
   }
};
