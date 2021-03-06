const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

//db configuration
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connection success"))
  .catch(err => console.log("Error", err));

//Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
