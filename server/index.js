const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//const mongoose = require("mongoose");
//const pool = require("./config/db.js");
require("dotenv/config");

const app = express();
// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request data content type application/json
app.use(bodyParser.json());
app.use(cors({ allowedHeaders: "Content-Type, Cache-Control" }));

// import routes
const Routes = require("./routes/Routes.js");
// create routes
app.use("/api/v1", Routes);

//DB connection
// mongoose
//   .connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connected!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const PORT = process.env.PORT || 3306; //backend routing port

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
