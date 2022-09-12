const express = require("express");
const routes = require("./route.js");

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

const PORT = 5050;

app.listen(PORT, () => console.log(`App is running on ${PORT}...`));
