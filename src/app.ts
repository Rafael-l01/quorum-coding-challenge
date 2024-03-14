import * as express from "express";
import { Request, Response } from "express";
import router from "./routes/routes";

const app: express.Application = express();
const port: number = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
