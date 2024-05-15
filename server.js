const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectToDB = require("./startup/db");
const app = express();

connectToDB();

app.use(
  cors({
    origin: true,
    methods: "GET,POST,DELETE, PUT",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.use(express.json());
require("./startup/routes")(app);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));
