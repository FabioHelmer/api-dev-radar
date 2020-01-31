const Dev = require("../models/Devs");
const parseStringArray = require("../utils/parseStringArray");
module.exports = {
  //busca tofod devs num raio de 10 km
  //filtrar por tech
  async index(req, res) {
    console.log(req.query);
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json(devs);
  }
};
