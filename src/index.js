const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();
mongoose.connect(
  "mongodb+srv://admfabio:admfabio@cluster0-4vago.mongodb.net/dev_radar?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);
console.log("server on");
