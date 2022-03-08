const express = require("express");
const mongoose = require("mongoose");
const profileModels = require("./models/profile.models");
const app = express();
const Port = process.env.PORT || 5000;



mongoose.connect('mongodb+srv://rejeki:1506@cluster0.cfm9t.mongodb.net/myapp?retryWrites=true&w=majority');

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDb Connected");
});

app.use(express.json());
const UserRoute = require("./routes/user");
app.use("/user", UserRoute);
const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

data = {
    msg: "Welcome on DevStack Blog App development YouTube video series",
    info: "This is a root endpoint",
    Working: "Documentations of other endpoints will be release soon :)",
    request:
      "Hey if you did'nt subscribed my YouTube channle please subscribe it",
  };


app.route("/").get((req, res) => res.json(data));

app.listen(Port, () => console.log(`welcome your listening at port ${Port}`));