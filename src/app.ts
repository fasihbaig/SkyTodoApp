import express from "express";
import { DataBase, UserNS } from "./data-access-layer";

import * as bodyParser from "body-parser";

import * as dotenv from "dotenv";
import routerAPI from "./routes/router";
import compression from "compression";

dotenv.config();

const app = express();

app.use(compression())

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const port = process.env.PORT;

(async () => {
  const db = new DataBase();
  await db.initializeDBConnection();
})();

app.use('/api', routerAPI);

app.listen(port, () => {
  console.info(`[server]: Server is listening:${port}`);
});
