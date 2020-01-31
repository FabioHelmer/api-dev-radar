const axios = require("axios");
const Dev = require("../models/Devs");
const parseStringArray = require("../utils/parseStringArray");
module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    var { github_username, techs, longitude, latitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = response.data;

      console.log(name, avatar_url, bio, github_username, techs);
      const techsArray = parseStringArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      res.json(dev);
    } else {
      res.json({ message: "ja existe" });
    }
  }
};
