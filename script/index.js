const dotenv = require("dotenv").config()
const http = require("http")

const app = require("./server.js")

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is running on ${PORT}...`));
