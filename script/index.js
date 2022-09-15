require("dotenv").config()
const http = require("http")

const app = require("./server.js")

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
