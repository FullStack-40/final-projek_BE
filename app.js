const express = require("express");
const db = require("./config/db");
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

db.then(() => {
  console.log("success connect to mongodb");
}).catch(() => {
  console.log("failed to connect to mongodb");
});

app.use(morgan(":method :url :status - :response-time ms"));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
