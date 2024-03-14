import * as express from "express";
import { Request, Response } from "express";
import router from "./routes/routes";
const cors = require("cors");

const app: express.Application = express();
const port = 8000;

app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
