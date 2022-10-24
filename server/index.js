const express = require("express");
const app = express();
const configureDB = require("./config/database");
configureDB();
const cors = require("cors");
const routes = require("./config/routes");
const port = 3089;
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log("listening on port", port);
});
